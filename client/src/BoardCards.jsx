import { useState } from "react";

const BoardCards = ({
  key,
  id,
  boardId,
  img,
  message,
  author,
  likes,
  deleteCard,
}) => {
  const [newLikes, setNewLikes] = useState(likes);

  const updateLike = () => {
    const updatedLikes = newLikes + 1; // Increment the current likes
    fetch(`${import.meta.env.VITE_BOARD_URL}/${boardId}/cards/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likeCount: updatedLikes }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setNewLikes(updatedLikes);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="card">
      <div className="img-container">
        <img src={img} alt="Card Poster" />
      </div>
      <div className="txt-container">
        <h2>{message}</h2>
        <p>{author}</p>
      </div>
      <div className="btn-contain">
        <button onClick={updateLike}>{newLikes} Likes</button>
        <button onClick={() => deleteCard(boardId, id)}>Delete Card</button>
      </div>
    </div>
  );
};

export default BoardCards;
