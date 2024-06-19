import "./KudosCard.css";
const KudosCard = ({ key, img, eventName, author, cardType }) => {
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
        <button>View Board</button>
        <button>Delete Board</button>
      </div>
    </div>
  );
};

export default KudosCard;
