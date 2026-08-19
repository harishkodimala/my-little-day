const Task = require("../models/Task")


// ==========================================
// CREATE TASK
// ==========================================

const createTask = async (req, res) => {

  try {

    const {
      title,
      emoji,
      priority,
      date,
    } = req.body

    if (!title || !date) {
      return res.status(400).json({
        success: false,
        message: "Title and date are required",
      })
    }

    const task = await Task.create({
      title,
      emoji,
      priority,
      date,
    })

    res.status(201).json({
      success: true,
      message: "Task created successfully 🌸",
      task,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// GET TASKS BY DATE
// ==========================================

const getTasksByDate = async (req, res) => {

  try {

    const { date } = req.query

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      })
    }

    const tasks = await Task.find({
      date,
    }).sort({
      createdAt: 1,
    })

    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// TOGGLE TASK
// ==========================================

const toggleTaskCompletion = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    )

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }


    // Toggle state
    task.completed = !task.completed


    // Store completion time only
    // when task becomes completed
    task.completedAt = task.completed
      ? new Date()
      : null


    await task.save()


    res.status(200).json({
      success: true,
      message: task.completed
        ? "Task completed 🌸"
        : "Task marked as incomplete 🌱",
      task,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// DELETE TASK
// ==========================================

const deleteTask = async (req, res) => {

  try {

    const task = await Task.findById(
      req.params.id
    )

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }


    // Only unfinished tasks can be deleted
    if (task.completed) {
      return res.status(400).json({
        success: false,
        message:
          "Completed tasks cannot be deleted.",
      })
    }


    await Task.findByIdAndDelete(
      req.params.id
    )


    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// GET TASK HISTORY
// ==========================================

const getTaskHistory = async (req, res) => {

  try {

    // Get today's date in YYYY-MM-DD format
    const today = new Date()

    const year = today.getFullYear()

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0")

    const day = String(
      today.getDate()
    ).padStart(2, "0")

    const todayDate =
      `${year}-${month}-${day}`


    const tasks = await Task.find({
      completed: true,
      date: {
        $lt: todayDate,
      },
    })
      .sort({
        date: -1,
        completedAt: -1,
      })
      .lean()


    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}

// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createTask,
  getTasksByDate,
  toggleTaskCompletion,
  deleteTask,
  getTaskHistory,
}