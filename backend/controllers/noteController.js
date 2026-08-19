const Note = require("../models/Note")


// ==========================================
// CREATE NOTE
// ==========================================

const createNote = async (req, res) => {

  try {

    const {
      title,
      content,
      emoji,
      color,
    } = req.body


    if (!title || !content) {

      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      })

    }


    const note = await Note.create({
      title,
      content,
      emoji,
      color,
    })


    res.status(201).json({
      success: true,
      message: "Note created successfully 🌸",
      note,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// GET ALL NOTES
// ==========================================

const getNotes = async (req, res) => {

  try {

    const notes = await Note.find()
      .sort({
        createdAt: -1,
      })


    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// DELETE NOTE
// ==========================================

const deleteNote = async (req, res) => {

  try {

    const note = await Note.findById(
      req.params.id
    )


    if (!note) {

      return res.status(404).json({
        success: false,
        message: "Note not found",
      })

    }


    await Note.findByIdAndDelete(
      req.params.id
    )


    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


module.exports = {
  createNote,
  getNotes,
  deleteNote,
}