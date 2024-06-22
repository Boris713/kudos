import { useState } from "react";
import "./AddCards.css";

const AddCards = ({ modalOpen, handleClose, newCard }) => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div
      className="modal-overlay"
      style={{ display: modalOpen ? "flex" : "none" }}
    >
      <div className="new-card-form">
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <h2>Create a New Card</h2>
        <label>Message:</label>
        <input
          type="text"
          required=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>

        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <button
          type="button"
          onClick={() => {
            newCard(message, author);
            handleClose();
            setAuthor("");
            setMessage("");
          }}
        >
          Create Card
        </button>
      </div>
    </div>
  );
};

export default AddCards;
