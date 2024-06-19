import "./AddCard.css";

const AddCard = () => {
  const handleClose = () => {
    // Logic to close the modal
    return;
  };

  return (
    <div className="modal-overlay">
      <div className="new-board-form">
        <button className="close-btn">X</button>
        <h2>Create a New Board</h2>
        <label>Title:</label>
        <input type="text" required="" value=""></input>
        <label>Category:</label>
        <select required="">
          <option value="">Select a category</option>
          <option value="Recent">Recent</option>
          <option value="Celebration">Celebration</option>
          <option value="Thank You">Thank You</option>
          <option value="Inspiration">Inspiration</option>
        </select>
        <label>Author:</label>
        <input type="text" value=""></input>
        <button className="submit">Create Board</button>
      </div>
    </div>
  );
};

export default AddCard;
