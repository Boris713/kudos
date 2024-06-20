import "./Nav.css";
const Nav = ({ handleSearch, handleSort }) => {
  return (
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
        <button className="btn">Create New</button>
      </div>
    </div>
  );
};
export default Nav;
