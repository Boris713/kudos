import "./KudosCard.css";
const KudosCard = () => {
  return (
    <div className="card">
      <div className="img-container">
        <img src=".." alt="Kudos Poster" />
      </div>
      <div className="txt-container">
        <h2>Kudos Card</h2>
        <div className="sub-txt"></div>
        <p className="rating">Info</p>
      </div>
      <div className="btn">
        <button>View Board</button>
        <button>Delete Board</button>
      </div>
    </div>
  );
};

export default KudosCard;
