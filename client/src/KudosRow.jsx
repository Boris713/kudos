import { useEffect, useState } from "react";
import "./KudosRow.css";
import KudosCard from "./KudosCard";

const KudosRow = ({
  searchTerm,
  sortTerm,

  boardInfo,
  deleteBoard,
}) => {
  let sortedAndFiltered = boardInfo.filter((board) =>
    board.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortTerm === "Recent") {
    sortedAndFiltered = sortedAndFiltered.sort(
      (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
    );
  } else {
    sortedAndFiltered = sortedAndFiltered.filter(
      (board) => sortTerm === "All" || board.category === sortTerm
    );
  }
  const cards = sortedAndFiltered.map((board) => (
    <KudosCard
      key={board.id}
      id={board.id}
      img={`https://picsum.photos/200/300?random=${board.id}`}
      eventName={board.title}
      author={board.author}
      cardType={board.category}
      deleteBoard={deleteBoard}
    />
  ));

  return (
    <div className="kudos-row">
      {cards.length > 0 ? cards : <p>No boards available.</p>}
    </div>
  );
};

export default KudosRow;
