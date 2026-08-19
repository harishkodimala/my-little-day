const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const connectDB = require("./config/db")

const taskRoutes = require("./routes/taskRoutes")
const scheduleRoutes = require("./routes/scheduleRoutes")
const noteRoutes = require("./routes/noteRoutes")
const accessRoutes = require("./routes/accessRoutes")

const requireAccess =
  require("./middleware/accessMiddleware")


const app = express()


// ==========================================
// DATABASE
// ==========================================

connectDB()


// ==========================================
// MIDDLEWARE
// ==========================================

const allowedOrigins = [
  process.env.FRONTEND_URL,
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(
        new Error("Not allowed by CORS")
      )
    },

    credentials: true,
  })
)

app.use(express.json())

app.use(cookieParser())


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Unlock endpoint remains public.
// User needs to access this before
// getting the protected application APIs.

app.use(
  "/api/access",
  accessRoutes
)


// ==========================================
// PROTECTED ROUTES
// ==========================================

// Tasks

app.use(
  "/api/tasks",
  requireAccess,
  taskRoutes
)


// Schedule

app.use(
  "/api/schedules",
  requireAccess,
  scheduleRoutes
)


// Notes

app.use(
  "/api/notes",
  requireAccess,
  noteRoutes
)


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

  res.json({
    success: true,
    message:
      "My Little Day API is running 🌸",
  })

})


// ==========================================
// SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000


app.listen(PORT, () => {

  console.log(
    `🌸 Server running on port ${PORT}`
  )

})