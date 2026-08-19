const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    emoji: {
      type: String,
      default: "🌸",
    },

    priority: {
      type: String,
      enum: ["Easy", "Medium", "High"],
      default: "Easy",
    },

    date: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task