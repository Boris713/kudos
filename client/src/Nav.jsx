import "./Nav.css";
const Nav = () => {
  return (
    <div className="nav-bar">
      <div className="search-bar">
        <input type="search" name="kudos-search" id="kudos-search" />
      </div>
      <div className="sort-container">
        <button className="btn">All</button>
        <button className="btn">Recent</button>
        <button className="btn">Celebration</button>
        <button className="btn">Thank You</button>
        <button className="btn">Inspiration</button>
      </div>
      <div>
        <button className="btn">Create New</button>
      </div>
    </div>
  );
};
export default Nav;
