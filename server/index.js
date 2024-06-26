const express = require("express");
const cors = require("cors");
const app = express();

const PORT = 3000;

const kudosRoutes = require("./routes/kudosRoutes");
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

app.use("/kudos", kudosRoutes);
