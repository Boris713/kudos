import { useState } from "react";
import AddBoard from "./AddBoard";
import "./Nav.css";
const Nav = ({ handleSearch, handleSort, addBoard }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  const handleClose = () => {
    setButtonPressed(false);
  };

  return (
    <>
      <div className="nav-bar">
        <div className="search-bar">
          <input
            type="search"
            name="kudos-search"
            id="kudos-search"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="sort-container">
          <button className="btn" onClick={() => handleSort("All")}>
            All
          </button>
          <button className="btn" onClick={() => handleSort("Recent")}>
            Recent
          </button>
          <button className="btn" onClick={() => handleSort("Celebration")}>
            Celebration
          </button>
          <button className="btn" onClick={() => handleSort("Thank You")}>
            Thank You
          </button>
          <button className="btn" onClick={() => handleSort("Inspiration")}>
            Inspiration
          </button>
        </div>
        <div>
          <button className="btn" onClick={() => setButtonPressed(true)}>
            Create New Board
          </button>
        </div>
      </div>
      <AddBoard
        modalOpen={buttonPressed}
        handleClose={handleClose}
        addBoard={addBoard}
      />
    </>
  );
};
export default Nav;
