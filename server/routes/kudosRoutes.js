const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/board", async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        category: true,
        releaseDate: true,
      },
    });

    return res.status(200).json(boards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/board", async (req, res) => {
  try {
    const { title, author, category, userId } = req.body; // Assuming userId is passed from the client
    const newBoard = await prisma.board.create({
      data: {
        title,
        author,
        category,
        userId,
      },
    });
    return res.status(201).json(newBoard);
  } catch (error) {
    console.error("Failed to create board:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/board/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ message: "Board deleted: ", board });
  } catch (error) {
    console.error("Failed to delete:", error);
    if (error.code === "P2025") {
      return res.status(404).send("Board not found");
    }
    res.status(500).send(error.message);
  }
});

router.get("/board/:id/cards", async (req, res) => {
  try {
    const { id } = req.params;
    const boardId = parseInt(id);

    if (isNaN(boardId)) {
      return res.status(400).json({ message: "Invalid board ID" });
    }

    const cards = await prisma.card.findMany({
      where: {
        boardId: boardId,
      },
      select: {
        id: true,
        message: true,
        author: true,
        likes: true,
      },
    });
    res.status(200).json(cards);
  } catch (error) {
    console.error("Failed to get cards:", error);
    res.status(500).send(error.message);
  }
});

router.post("/board/:id/cards", async (req, res) => {
  const { id } = req.params;
  const boardId = parseInt(id);

  if (isNaN(boardId)) {
    return res.status(400).json({ message: "Invalid board ID" });
  }

  const { message, author } = req.body;
  let { likes } = req.body;
  likes = likes || 0;

  try {
    const newCard = await prisma.card.create({
      data: {
        message,
        author,
        likes,
        boardId: boardId,
      },
    });
    return res.status(201).json(newCard);
  } catch (error) {
    console.error("Failed to create card:", error);
    res.status(500).send("Failed to create card due to server error");
  }
});

router.delete("/board/:boardId/cards/:cardId", async (req, res) => {
  try {
    const { cardId } = req.params;

    const card = await prisma.card.delete({
      where: {
        id: parseInt(cardId),
      },
    });

    return res.status(200).json({ message: "Card deleted successfully", card });
  } catch (error) {
    console.error("Failed to delete card:", error);
    if (error.code === "P2025") {
      return res.status(404).send("Card not found");
    }
    res.status(500).send(error.message);
  }
});

router.patch("/board/:boardId/cards/:cardId", async (req, res) => {
  const { cardId } = req.params;
  const { likeCount } = req.body;
  try {
    // Validate input
    if (likeCount === undefined || likeCount < 0) {
      return res.status(400).json({ message: "Invalid like count provided." });
    }
    // Update the card in the database
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(cardId) },
      data: { likes: likeCount },
    });
    // Respond with the updated card data
    res.json({
      message: "Likes updated successfully",
      card: updatedCard,
    });
  } catch (error) {
    console.error("Failed to update likes:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Card not found." });
    }
    res
      .status(500)
      .json({ message: "An error occurred while updating likes." });
  }
});

// fetch('https://api.example.com/data/123', {
// method: 'PATCH',
// headers: {
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify({ key: 'new-value' }),
// })
// .then(res => res.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error patching data:', error));
module.exports = router;
/* for future PR */
// BOARDS
// POST /boards: Create a new board.

// CARDS
// POST /cards: Create a new card.

// USERS
// POST /users: Create a new user.
// PUT /users/:id: Update an existing user by ID.
// DELETE /users/:id: Delete a specific user by ID.
