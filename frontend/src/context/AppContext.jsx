import {
  createContext,
  useContext,
  useState,
} from "react"

import api from "../api/axios"

import {
  getTodayDate,
} from "../utils/date"


const AppContext = createContext(null)


// ==========================================
// APP PROVIDER
// ==========================================

export function AppProvider({ children }) {

  // ==========================================
  // TASKS
  // ==========================================

  const [tasks, setTasks] = useState([])

  const [tasksLoading, setTasksLoading] =
    useState(false)

  const [tasksError, setTasksError] =
    useState("")


  // ==========================================
  // TASK HISTORY
  // ==========================================

  const [taskHistory, setTaskHistory] =
    useState([])

  const [
    historyLoading,
    setHistoryLoading,
  ] = useState(false)

  const [
    historyError,
    setHistoryError,
  ] = useState("")


  // ==========================================
  // SCHEDULES
  // ==========================================

  const [schedules, setSchedules] =
    useState([])

  const [
    schedulesLoading,
    setSchedulesLoading,
  ] = useState(false)

  const [
    schedulesError,
    setSchedulesError,
  ] = useState("")


  // ==========================================
  // NOTES
  // ==========================================

  const [notes, setNotes] = useState([])

  const [
    notesLoading,
    setNotesLoading,
  ] = useState(false)

  const [
    notesError,
    setNotesError,
  ] = useState("")


  // ==========================================
  // FETCH TASKS
  // ==========================================

  const fetchTasks = async (
    date = getTodayDate()
  ) => {

    try {

      setTasksLoading(true)
      setTasksError("")

      const response =
        await api.get(
          `/tasks?date=${date}`
        )

      setTasks(
        response.data.tasks || []
      )

    } catch (error) {

      console.error(
        "Failed to fetch tasks:",
        error
      )

      setTasksError(
        error.response?.data?.message ||
        "Unable to load tasks."
      )

      setTasks([])

    } finally {

      setTasksLoading(false)

    }
  }


  // ==========================================
  // ADD TASK
  // ==========================================

  const addTask = async (task) => {

    try {

      setTasksError("")

      const response =
        await api.post(
          "/tasks",
          {
            title: task.title,
            emoji:
              task.emoji || "🌸",
            priority:
              task.priority || "Easy",
            date: task.date,
          }
        )

      const createdTask =
        response.data.task

      setTasks(prev => [
        ...prev,
        createdTask,
      ])

      return createdTask

    } catch (error) {

      console.error(
        "Failed to add task:",
        error
      )

      setTasksError(
        error.response?.data?.message ||
        "Unable to add task."
      )

      throw error

    }

  }


  // ==========================================
  // TOGGLE TASK
  // ==========================================

  const toggleTask = async (id) => {

    try {

      setTasksError("")

      const response =
        await api.patch(
          `/tasks/${id}/toggle`
        )

      const updatedTask =
        response.data.task

      setTasks(prev =>
        prev.map(task =>
          task._id === updatedTask._id
            ? updatedTask
            : task
        )
      )

      // Refresh history because a completed
      // task may have been completed/undone.
      await fetchTaskHistory()

      return updatedTask

    } catch (error) {

      console.error(
        "Failed to toggle task:",
        error
      )

      setTasksError(
        error.response?.data?.message ||
        "Unable to update task."
      )

      throw error

    }
  }


  // ==========================================
  // DELETE TASK
  // ==========================================

  const deleteTask = async (id) => {

    try {

      setTasksError("")

      await api.delete(
        `/tasks/${id}`
      )

      setTasks(prev =>
        prev.filter(
          task => task._id !== id
        )
      )

    } catch (error) {

      console.error(
        "Failed to delete task:",
        error
      )

      setTasksError(
        error.response?.data?.message ||
        "Unable to delete task."
      )

      throw error

    }

  }


  // ==========================================
  // FETCH TASK HISTORY
  // ==========================================

  const fetchTaskHistory = async () => {

    try {

      setHistoryLoading(true)
      setHistoryError("")

      const response =
        await api.get(
          "/tasks/history"
        )

      setTaskHistory(
        response.data.tasks || []
      )

    } catch (error) {

      console.error(
        "Failed to fetch task history:",
        error
      )

      setHistoryError(
        error.response?.data?.message ||
        "Unable to load task history."
      )

      setTaskHistory([])

    } finally {

      setHistoryLoading(false)

    }

  }


  // ==========================================
  // SCHEDULES
  // ==========================================

  const fetchSchedules = async (
    date = getTodayDate()
  ) => {

    try {

      setSchedulesLoading(true)
      setSchedulesError("")

      const response =
        await api.get(
          `/schedules?date=${date}`
        )

      setSchedules(
        response.data.schedules || []
      )

    } catch (error) {

      console.error(
        "Failed to fetch schedules:",
        error
      )

      setSchedulesError(
        error.response?.data?.message ||
        "Unable to load schedules."
      )

      setSchedules([])

    } finally {

      setSchedulesLoading(false)

    }

  }


  // ==========================================
  // ADD SCHEDULE
  // ==========================================

  const addSchedule = async (
    schedule
  ) => {

    try {

      setSchedulesError("")

      const response =
        await api.post(
          "/schedules",
          {
            title: schedule.title,
            time: schedule.time,
            emoji:
              schedule.emoji || "🌸",
            date: schedule.date,
          }
        )

      const createdSchedule =
        response.data.schedule

      setSchedules(prev => [
        ...prev,
        createdSchedule,
      ])

      return createdSchedule

    } catch (error) {

      console.error(
        "Failed to add schedule:",
        error
      )

      setSchedulesError(
        error.response?.data?.message ||
        "Unable to add schedule."
      )

      throw error

    }

  }


  // ==========================================
  // DELETE SCHEDULE
  // ==========================================

  const deleteSchedule = async (
    id
  ) => {

    try {

      setSchedulesError("")

      await api.delete(
        `/schedules/${id}`
      )

      setSchedules(prev =>
        prev.filter(
          schedule =>
            schedule._id !== id
        )
      )

    } catch (error) {

      console.error(
        "Failed to delete schedule:",
        error
      )

      setSchedulesError(
        error.response?.data?.message ||
        "Unable to delete schedule."
      )

      throw error

    }

  }


  // ==========================================
  // NOTES
  // ==========================================

  const fetchNotes = async () => {

    try {

      setNotesLoading(true)
      setNotesError("")

      const response =
        await api.get(
          "/notes"
        )

      setNotes(
        response.data.notes || []
      )

    } catch (error) {

      console.error(
        "Failed to fetch notes:",
        error
      )

      setNotesError(
        error.response?.data?.message ||
        "Unable to load notes."
      )

      setNotes([])

    } finally {

      setNotesLoading(false)

    }

  }


  // ==========================================
  // ADD NOTE
  // ==========================================

  const addNote = async (note) => {

    try {

      setNotesError("")

      const response =
        await api.post(
          "/notes",
          {
            title:
              note.title?.trim() ||
              "Little thought",

            content:
              note.content?.trim() ||
              "",

            emoji:
              note.emoji || "🌸",

            color:
              note.color || "pink",
          }
        )

      const createdNote =
        response.data.note

      setNotes(prev => [
        createdNote,
        ...prev,
      ])

      return createdNote

    } catch (error) {

      console.error(
        "Failed to add note:",
        error
      )

      setNotesError(
        error.response?.data?.message ||
        "Unable to add note."
      )

      throw error

    }

  }


  // ==========================================
  // DELETE NOTE
  // ==========================================

  const deleteNote = async (
    id
  ) => {

    try {

      setNotesError("")

      await api.delete(
        `/notes/${id}`
      )

      setNotes(prev =>
        prev.filter(
          note => note._id !== id
        )
      )

    } catch (error) {

      console.error(
        "Failed to delete note:",
        error
      )

      setNotesError(
        error.response?.data?.message ||
        "Unable to delete note."
      )

      throw error

    }

  }


  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {

    // -------------------------
    // Tasks
    // -------------------------

    tasks,
    tasksLoading,
    tasksError,

    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,


    // -------------------------
    // Task History
    // -------------------------

    taskHistory,
    historyLoading,
    historyError,
    fetchTaskHistory,


    // -------------------------
    // Schedules
    // -------------------------

    schedules,
    schedulesLoading,
    schedulesError,

    fetchSchedules,
    addSchedule,
    deleteSchedule,


    // -------------------------
    // Notes
    // -------------------------

    notes,
    notesLoading,
    notesError,

    fetchNotes,
    addNote,
    deleteNote,

  }


  return (

    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>

  )

}


// ==========================================
// CUSTOM HOOK
// ==========================================

export function useApp() {

  const context =
    useContext(AppContext)

  if (!context) {

    throw new Error(
      "useApp must be used inside AppProvider"
    )

  }

  return context

}