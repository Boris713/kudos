import { useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import KudosRow from "./KudosRow";
import AddCard from "./AddCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("All");

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleSort = (term) => {
    setSortTerm(term);
  };

  return (
    <>
      <Header title={"Kudos"} />
      <Nav handleSearch={handleSearch} handleSort={handleSort} />
      <KudosRow searchTerm={searchTerm} sortTerm={sortTerm} />
      <AddCard />
    </>
  );
}

export default App;
