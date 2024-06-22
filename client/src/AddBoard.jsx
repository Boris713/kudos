import { useState } from "react";
import "./AddBoard.css";

const AddBoard = ({ modalOpen, handleClose, addBoard }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div
      className="modal-overlay"
      style={{ display: modalOpen ? "flex" : "none" }}
    >
      <div className="new-board-form">
        <button className="close-btn" onClick={() => handleClose()}>
          X
        </button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input
          type="text"
          required=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Category:</label>
        <select
          required=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <button
          type="button"
          onClick={() => {
            addBoard(title, category, author);
            handleClose();
            setTitle("");
            setCategory("");
            setAuthor("");
          }}
        >
          Create Board
        </button>
      </div>
    </div>
  );
};

export default AddBoard;
