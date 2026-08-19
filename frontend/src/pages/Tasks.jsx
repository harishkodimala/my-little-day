import { useEffect, useState } from "react"

import {
  Plus,
  Sparkles,
} from "lucide-react"

import { useApp } from "../context/AppContext"

import TaskCard from "../components/TaskCard"
import EmptyState from "../components/EmptyState"
import useToday from "../hooks/useToday"

import {
  getTodayDate,
  addDays,
  formatLongDate,
} from "../utils/date"


function Tasks() {

  // ==========================================
  // APP CONTEXT
  // ==========================================

  const {
    tasks,
    tasksLoading,
    tasksError,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
  } = useApp()


  // ==========================================
  // DATE
  // ==========================================

  const today = useToday()

  const dayOptions = [
    {
      label: "Yesterday",
      date: addDays(today, -1),
    },
    {
      label: "Today",
      date: today,
    },
    {
      label: "Tomorrow",
      date: addDays(today, 1),
    },
  ]


  const [selectedDate, setSelectedDate] =
    useState(today)


  // ==========================================
  // FORM
  // ==========================================

  const [showForm, setShowForm] =
    useState(false)

  const [newTask, setNewTask] =
    useState({
      title: "",
      emoji: "🌸",
      priority: "Easy",
    })


  // ==========================================
  // LOAD TASKS FOR SELECTED DATE
  // ==========================================

  useEffect(() => {

    fetchTasks(selectedDate)

  }, [selectedDate])


  // ==========================================
  // PROGRESS
  // ==========================================

  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length


  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0


  // ==========================================
  // ADD TASK
  // ==========================================

  const handleAddTask = async () => {

    if (!newTask.title.trim()) {
      return
    }


    try {

      await addTask({

        title:
          newTask.title.trim(),

        emoji:
          newTask.emoji,

        priority:
          newTask.priority,

        date:
          selectedDate,

      })


      setNewTask({
        title: "",
        emoji: "🌸",
        priority: "Easy",
      })

      setShowForm(false)

    } catch (error) {

      console.error(
        "Failed to add task:",
        error
      )

    }
  }


  // ==========================================
  // PRIORITY COLORS
  // ==========================================

  const priorityStyle = {

    Easy:
      "bg-green-50 text-green-500",

    Medium:
      "bg-yellow-50 text-yellow-500",

    High:
      "bg-pink-50 text-pink-500",

  }


  return (

    <div className="relative space-y-7 pb-8">


      {/* ========================================
          HEADER
      ======================================== */}

      <header>

        <div className="flex items-center gap-2">

          <Sparkles
            size={18}
            className="text-pink-400"
          />

          <p className="text-sm font-semibold text-pink-400">
            Little things matter
          </p>

        </div>


        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          My Tasks 🌸
        </h1>


        <p className="mt-1 text-sm text-gray-400">
          Take it one little step at a time. 💕
        </p>

      </header>



      {/* ========================================
          DAY SELECTOR
      ======================================== */}

      <div className="flex gap-2 overflow-x-auto pb-1">

        {dayOptions.map(day => (

          <button
            key={day.date}
            onClick={() =>
              setSelectedDate(day.date)
            }
            className={`whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-bold transition-all ${
              selectedDate === day.date
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-100"
                : "bg-white text-gray-400 shadow-sm hover:bg-pink-50 hover:text-pink-400"
            }`}
          >
            {day.label}
          </button>

        ))}

      </div>


      <p className="text-sm text-gray-400">
        {formatLongDate(selectedDate)}
      </p>



      {/* ========================================
          ERROR
      ======================================== */}

      {tasksError && (

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {tasksError}
        </div>

      )}



      {/* ========================================
          PROGRESS CARD
      ======================================== */}

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 shadow-sm">

        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/30" />

        <div className="absolute -bottom-10 -left-5 h-24 w-24 rounded-full bg-white/20" />


        <div className="relative">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-bold text-pink-500">
                {selectedDate === today
                  ? "Today's progress 🌱"
                  : "Day's progress 🌱"}
              </p>


              <div className="mt-2 flex items-end gap-2">

                <span className="text-5xl font-extrabold text-gray-800">
                  {progress}%
                </span>

                <span className="mb-2 text-sm text-gray-400">
                  complete
                </span>

              </div>

            </div>


            <div className="text-5xl">

              {progress === 100
                ? "🎉"
                : progress >= 50
                ? "🌷"
                : "🌱"}

            </div>

          </div>


          {/* Progress bar */}

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/70">

            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-700"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">

            <p className="text-sm text-gray-500">
              {completedTasks} of {tasks.length} little things done ✨
            </p>


            <p className="text-sm font-semibold text-pink-500">

              {progress === 100
                ? "Everything done! 🎉"
                : progress >= 50
                ? "You're doing great! 🌷"
                : progress > 0
                ? "Keep going! 🌱"
                : "Let's start something lovely 🌸"}

            </p>

          </div>

        </div>

      </section>



      {/* ========================================
          TASK HEADER
      ======================================== */}

      <div className="flex items-end justify-between">

        <div>

          <h2 className="text-xl font-extrabold text-gray-800">

            {selectedDate === today
              ? "Today's little things"
              : "Little things"}

          </h2>


          <p className="mt-1 text-sm text-gray-400">

            {selectedDate === today
              ? "You've got this 💕"
              : "A look back at this day 🌷"}

          </p>

        </div>


        {/* ====================================
            ADD BUTTON ONLY FOR TODAY
        ==================================== */}

        {selectedDate === today ? (

          <button
            onClick={() => setShowForm(true)}
            className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:flex"
          >

            <Plus size={18} />

            Add task

          </button>

        ) : (

          <div className="hidden rounded-2xl bg-gray-100 px-4 py-3 text-xs font-semibold text-gray-400 sm:block">
            Read only 🔒
          </div>

        )}

      </div>



      {/* ========================================
          LOADING
      ======================================== */}

      {tasksLoading ? (

        <div className="rounded-[2rem] bg-pink-50 p-10 text-center">

          <div className="animate-pulse text-4xl">
            🌸
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Loading your little plans...
          </p>

        </div>

      ) : tasks.length > 0 ? (

        <div className="space-y-3">

          {tasks.map(task => (

            <TaskCard
              key={task._id}
              task={task}
              onToggle={
                selectedDate === today
                  ? toggleTask
                  : undefined
              }
              onDelete={
                selectedDate === today
                  ? deleteTask
                  : undefined
              }
              readOnly={
                selectedDate !== today
              }
            />

          ))}

        </div>

      ) : (

        <EmptyState
          emoji="🌷"

          title={
            selectedDate === today
              ? "Nothing planned yet"
              : "Nothing recorded for this day"
          }

          description={
            selectedDate === today
              ? "Add a little something to your day."
              : "This day doesn't have any tasks yet."
          }

          buttonText="Add first task ✨"

          onClick={
            selectedDate === today
              ? () => setShowForm(true)
              : undefined
          }

        />

      )}



      {/* ========================================
          MOBILE ADD BUTTON
      ======================================== */}

      {selectedDate === today && (

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200 transition hover:scale-105 active:scale-95 sm:hidden"
          aria-label="Add task"
        >

          <Plus size={25} />

        </button>

      )}



      {/* ========================================
          ADD TASK MODAL
      ======================================== */}

      {showForm && selectedDate === today && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">


            {/* Modal header */}

            <div className="flex items-start justify-between">

              <div>

                <div className="text-3xl">
                  🌸
                </div>

                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  Add a little task
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Something small for today. 💕
                </p>

              </div>


              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-xl px-2 text-xl text-gray-300 transition hover:bg-gray-50 hover:text-gray-500"
                aria-label="Close"
              >
                ×
              </button>

            </div>



            {/* TASK TITLE */}

            <div className="mt-6">

              <label
                htmlFor="task-title"
                className="text-sm font-bold text-gray-600"
              >
                What needs to be done?
              </label>


              <input
                id="task-title"
                type="text"
                autoFocus
                placeholder="e.g. Read a book"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleAddTask()
                  }

                }}
                className="mt-2 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50"
              />

            </div>



            {/* EMOJI */}

            <div className="mt-5">

              <label className="text-sm font-bold text-gray-600">
                Pick an emoji
              </label>


              <div className="mt-2 flex flex-wrap gap-2">

                {[
                  "🌸",
                  "📚",
                  "💻",
                  "💧",
                  "🌿",
                  "☕",
                  "🎵",
                  "🏃",
                  "❤️",
                  "✨",
                ].map(emoji => (

                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setNewTask({
                        ...newTask,
                        emoji,
                      })
                    }
                    className={`rounded-xl p-2 text-xl transition ${
                      newTask.emoji === emoji
                        ? "bg-pink-100 ring-2 ring-pink-300"
                        : "bg-gray-50 hover:bg-pink-50"
                    }`}
                  >
                    {emoji}
                  </button>

                ))}

              </div>

            </div>



            {/* PRIORITY */}

            <div className="mt-5">

              <label className="text-sm font-bold text-gray-600">
                How important?
              </label>


              <div className="mt-2 grid grid-cols-3 gap-2">

                {[
                  "Easy",
                  "Medium",
                  "High",
                ].map(priority => (

                  <button
                    key={priority}
                    type="button"
                    onClick={() =>
                      setNewTask({
                        ...newTask,
                        priority,
                      })
                    }
                    className={`rounded-2xl py-3 text-sm font-semibold transition ${
                      newTask.priority === priority
                        ? `${priorityStyle[priority]} ring-2 ring-pink-200`
                        : "bg-gray-50 text-gray-400 hover:bg-pink-50"
                    }`}
                  >

                    {priority}

                  </button>

                ))}

              </div>

            </div>



            {/* SAVE */}

            <button
              onClick={handleAddTask}
              disabled={!newTask.title.trim()}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 font-bold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add task ✨
            </button>

          </div>

        </div>

      )}

    </div>
  )
}


export default Tasks