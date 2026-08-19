const mongoose = require("mongoose")

const scheduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    time: {
      type: String,
      required: true,
    },

    emoji: {
      type: String,
      default: "🌸",
    },

    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Schedule = mongoose.model(
  "Schedule",
  scheduleSchema
)

module.exports = Schedule