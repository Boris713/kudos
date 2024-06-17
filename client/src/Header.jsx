import "./Header.css";
const Header = ({ title }) => {
  return (
    <header className="app-header">
      <div className="title">
        <h1>{title}</h1>
      </div>
    </header>
  );
};
export default Header;
