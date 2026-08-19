const express = require("express")

const {
  createTask,
  getTasksByDate,
  toggleTaskCompletion,
  deleteTask,
  getTaskHistory,
} = require("../controllers/taskController")

const router = express.Router()


// Create task
router.post("/", createTask)


// Get tasks for a date
router.get("/", getTasksByDate)


// Get completed task history
router.get("/history", getTaskHistory)


// Toggle completed / incomplete
router.patch(
  "/:id/toggle",
  toggleTaskCompletion
)


// Delete task
router.delete(
  "/:id",
  deleteTask
)


module.exports = router