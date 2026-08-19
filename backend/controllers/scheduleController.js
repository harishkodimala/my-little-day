const Schedule = require("../models/Schedule")


// ==========================================
// CREATE SCHEDULE
// ==========================================

const createSchedule = async (req, res) => {

  try {

    const {
      title,
      time,
      emoji,
      date,
    } = req.body


    if (!title || !time || !date) {

      return res.status(400).json({
        success: false,
        message:
          "Title, time and date are required",
      })

    }


    const schedule = await Schedule.create({
      title,
      time,
      emoji,
      date,
    })


    res.status(201).json({
      success: true,
      message: "Schedule created successfully 🌸",
      schedule,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// GET SCHEDULES BY DATE
// ==========================================

const getSchedulesByDate = async (req, res) => {

  try {

    const { date } = req.query


    if (!date) {

      return res.status(400).json({
        success: false,
        message: "Date is required",
      })

    }


    const schedules = await Schedule.find({
      date,
    }).sort({
      createdAt: 1,
    })


    res.status(200).json({
      success: true,
      count: schedules.length,
      schedules,
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


// ==========================================
// DELETE SCHEDULE
// ==========================================

const deleteSchedule = async (req, res) => {

  try {

    const schedule =
      await Schedule.findById(
        req.params.id
      )


    if (!schedule) {

      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      })

    }


    await Schedule.findByIdAndDelete(
      req.params.id
    )


    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}


module.exports = {
  createSchedule,
  getSchedulesByDate,
  deleteSchedule,
}