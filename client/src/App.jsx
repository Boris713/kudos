import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import KudosRow from "./KudosRow";
import "./App.css";
import BoardDetails from "./pages/BoardDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("All");

  const [boardInfo, setBoardInfo] = useState([]);

  const populateCards = async () => {
    try {
      const resp = await fetch(import.meta.env.VITE_BOARD_URL);
      const data = await resp.json();
      setBoardInfo(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    populateCards();
  }, []);

  const deleteBoard = (id) => {
    fetch(`${import.meta.env.VITE_BOARD_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setBoardInfo((oldBoards) =>
            oldBoards.filter((board) => board.id !== id)
          );
        } else {
          response.json().then((data) => {
            console.error("Deletion failed:", data.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting board:", error);
      });
  };

  const addBoard = (title, category, author) => {
    const newBoardData = { title, category, author };
    fetch(`${import.meta.env.VITE_BOARD_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoardData),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to add board");
        }
        return response.json();
      })
      .then((data) => {
        setBoardInfo((oldBoards) => [...oldBoards, data]);
      })
      .catch((error) => {
        console.error("Error adding board:", error.message);
      });
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleSort = (term) => {
    setSortTerm(term);
  };

  return (
    <Router>
      <Header title={"Kudos"} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav
                handleSearch={handleSearch}
                handleSort={handleSort}
                addBoard={addBoard}
              />
              <KudosRow
                searchTerm={searchTerm}
                sortTerm={sortTerm}
                boardInfo={boardInfo}
                deleteBoard={deleteBoard}
              />
            </>
          }
          exact
        />
        <Route path="/board/:id" element={<BoardDetails />} />
      </Routes>
      <footer className="footer">
        <a
          href="https://www.linkedin.com/in/boris-hernandez-jr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn More
        </a>
      </footer>
    </Router>
  );
}

export default App;
