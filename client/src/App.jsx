import { useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import KudosRow from "./KudosRow";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <>
      <Header title={"Kudos"} />
      <Nav handleSearch={handleSearch} />
      <KudosRow searchTerm={searchTerm} />
    </>
  );
}

export default App;
