// KudosRow.jsx
import { useEffect, useState } from "react";
import "./KudosRow.css";
import KudosCard from "./KudosCard";

const KudosRow = ({ searchTerm }) => {
  const [boardInfo, setBoardInfo] = useState([]);

  const populateCards = async () => {
    try {
      console.log(import.meta.env.VITE_BOARD_URL);
      const resp = await fetch(import.meta.env.VITE_BOARD_URL);
      const data = await resp.json();
      setBoardInfo(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    populateCards();
  }, []);

  const cards = boardInfo
    .filter((board) =>
      board.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((board) => (
      <KudosCard
        key={board.id}
        img={`https://picsum.photos/200/300?random=${board.id}`}
        eventName={board.title}
        author={board.author}
        cardType={board.category}
      />
    ));

  return (
    <div className="kudos-row">
      {cards.length > 0 ? cards : <p>No boards available.</p>}
    </div>
  );
};

export default KudosRow;
