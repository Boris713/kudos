const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/board', async (req,res) => {
    try { 
    const boards = await prisma.board.findMany({
        select: {
            id: true,
            imageUrl: true,
            title: true,
            author: true,
            category: true
        }
    });
    
    return res.status(200).json(boards);
}catch (error) {
    res.status(500).send(error.message);
}

});
module.exports = router
/* for future PR */
// BOARDS
// GET /boards/:id: Retrieve a specific board by ID.
// POST /boards: Create a new board.
// DELETE /boards/:id: Delete a specific board by ID.

// CARDS
// GET /cards: Retrieve all cards.
// POST /cards: Create a new card.
// DELETE /cards/:id: Delete a specific card by ID.

// USERS
// POST /users: Create a new user.
// PUT /users/:id: Update an existing user by ID.
// DELETE /users/:id: Delete a specific user by ID.