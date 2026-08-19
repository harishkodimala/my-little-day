const express = require("express")

const {
  createSchedule,
  getSchedulesByDate,
  deleteSchedule,
} = require("../controllers/scheduleController")

const router = express.Router()


// Create schedule
router.post("/", createSchedule)


// Get schedules for a date
router.get("/", getSchedulesByDate)


// Delete schedule
router.delete("/:id", deleteSchedule)


module.exports = router