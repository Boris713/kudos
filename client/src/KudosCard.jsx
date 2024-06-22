import "./KudosCard.css";
import React from "react";
import { Link } from "react-router-dom";
const KudosCard = ({
  key,
  id,
  img,
  eventName,
  author,
  cardType,
  deleteBoard,
}) => {
  return (
    <div className="card">
      <div className="img-container">
        <img src={img} alt="Kudos Poster" />
      </div>
      <div className="txt-container">
        <h2>{eventName}</h2>
        <p>{author}</p>
        <p className="card-type">{cardType}</p>
      </div>
      <div className="btn-contain">
        <Link to={`/board/${id}`}>View Board</Link>
        <button onClick={() => deleteBoard(id)}>Delete Board</button>
      </div>
    </div>
  );
};

export default KudosCard;
