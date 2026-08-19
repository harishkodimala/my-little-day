const express = require("express")

const {
  createNote,
  getNotes,
  deleteNote,
} = require("../controllers/noteController")

const router = express.Router()


// Create note
router.post("/", createNote)


// Get all notes
router.get("/", getNotes)


// Delete note
router.delete("/:id", deleteNote)


module.exports = router