import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardCards from "../BoardCards";
import AddCards from "../AddCards";
import "../BoardDetails.css";

const BoardDetails = () => {
  const [cardInfo, setCardInfo] = useState([]);
  const { id: boardId } = useParams();

  const deleteCard = (boardId, id) => {
    console.log(boardId, id);
    fetch(`${import.meta.env.VITE_BOARD_URL}/${boardId}/cards/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setCardInfo((prevCards) =>
            prevCards.filter((card) => card.id !== id)
          );
        } else {
          console.error("Failed to delete the card");
          response.json().then((data) => {
            console.error(data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  };

  const addNewCard = async (message, author) => {
    const gifUrl = await fetchRandomGif();
    const newCardData = { message, author, boardId, img: gifUrl };
    fetch(`${import.meta.env.VITE_BOARD_URL}/${boardId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCardData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to add card");
        }
        return response.json();
      })
      .then((data) => {
        setCardInfo((oldCards) => [...oldCards, data]);
      })
      .catch((error) => {
        console.error("Error adding card:", error.message);
      });
  };

  useEffect(() => {
    const populateCards = async () => {
      try {
        const resp = await fetch(
          `${import.meta.env.VITE_BOARD_URL}/${boardId}/cards`
        );
        const cardsData = await resp.json();
        const cardsWithGifs = await Promise.all(
          cardsData.map(async (card) => {
            const gifUrl = await fetchRandomGif(); // Fetch a new GIF for each card
            return { ...card, img: gifUrl };
          })
        );
        setCardInfo(cardsWithGifs);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      }
    };
    populateCards();
  }, [boardId]);

  useEffect(() => {
    console.log(cardInfo);
  }, [cardInfo]);

  const fetchRandomGif = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=${
          import.meta.env.VITE_GIPHY_API_KEY
        }`
      );
      const data = await response.json();
      return data.data.embed_url;
    } catch (error) {
      console.error("Failed to fetch GIF:", error);
      return "https://via.placeholder.com/200";
    }
  };

  const cards = cardInfo.map((card) => (
    <BoardCards
      key={card.id}
      boardId={boardId}
      id={card.id}
      img={card.img}
      message={card.message}
      author={card.author}
      likes={card.likes}
      deleteCard={deleteCard}
    />
  ));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="new_card">
        <button className="btn" onClick={handleOpenModal}>
          Create New Card
        </button>
      </div>
      <div className="card-row">
        {cards.length > 0 ? cards : <p>No cards available.</p>}
      </div>
      {isModalOpen && (
        <AddCards
          modalOpen={isModalOpen}
          handleClose={handleCloseModal}
          newCard={addNewCard}
        />
      )}
    </>
  );
};

export default BoardDetails;
