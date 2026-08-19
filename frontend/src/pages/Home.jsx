import { useEffect } from "react"

import {
  ArrowRight,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

import { useApp } from "../context/AppContext"

import {
  getTodayDate,
} from "../utils/date"

import useToday from "../hooks/useToday"

import Greeting from "../components/Greeting"
import ProgressCard from "../components/ProgressCard"
import TaskCard from "../components/TaskCard"
import SchedulePreview from "../components/SchedulePreview"
import CuteMessage from "../components/CuteMessage"


// ==========================================
// CONVERT TIME TO MINUTES
// ==========================================

function convertToMinutes(time) {

  if (!time) {
    return null
  }

  const match = time.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)/i
  )

  if (!match) {
    return null
  }

  let hour = Number(match[1])

  const minute = Number(match[2])

  const period =
    match[3].toUpperCase()


  if (
    period === "PM" &&
    hour !== 12
  ) {
    hour += 12
  }


  if (
    period === "AM" &&
    hour === 12
  ) {
    hour = 0
  }


  return (
    hour * 60 +
    minute
  )
}


// ==========================================
// GET CURRENT TIME IN MINUTES
// ==========================================

function getCurrentMinutes() {

  const now = new Date()

  return (
    now.getHours() * 60 +
    now.getMinutes()
  )
}


// ==========================================
// HOME
// ==========================================

function Home() {

  const navigate = useNavigate()


  // ==========================================
  // APP CONTEXT
  // ==========================================

  const {
    tasks,
    tasksLoading,

    schedules,
    schedulesLoading,

    fetchTasks,
    fetchSchedules,

    toggleTask,
  } = useApp()


  // ==========================================
  // TODAY
  // ==========================================

  const today = useToday()


  // ==========================================
  // LOAD TODAY'S DATA
  // ==========================================

  useEffect(() => {

    fetchTasks(today)
    fetchSchedules(today)

  }, [today])


  // ==========================================
  // TASK PROGRESS
  // ==========================================

  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length


  const totalTasks =
    tasks.length


  // ==========================================
  // FIND NEXT SCHEDULE
  // ==========================================

  const currentMinutes =
    getCurrentMinutes()


  const upcomingSchedules =
    schedules
      .map(schedule => ({
        ...schedule,

        minutes:
          convertToMinutes(
            schedule.time
          ),
      }))

      .filter(
        schedule =>
          schedule.minutes !== null &&
          schedule.minutes >= currentMinutes
      )

      .sort(
        (a, b) =>
          a.minutes - b.minutes
      )


  const nextSchedule =
    upcomingSchedules.length > 0
      ? upcomingSchedules[0]
      : null


  return (

    <div className="space-y-7 pb-8">


      {/* ========================================
          GREETING
      ======================================== */}

      <Greeting />



      {/* ========================================
          PROGRESS + NEXT SCHEDULE
      ======================================== */}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">


        {/* Progress */}

        <ProgressCard
          completed={completedTasks}
          total={totalTasks}
        />


        {/* Schedule */}

        {schedulesLoading ? (

          <div className="rounded-[2rem] bg-blue-50 p-6 text-center">

            <div className="animate-pulse text-3xl">
              ⏰
            </div>

            <p className="mt-2 text-sm text-gray-400">
              Loading your schedule...
            </p>

          </div>

        ) : (

          <SchedulePreview
            schedule={nextSchedule}
          />

        )}

      </div>



      {/* ========================================
          TODAY'S TASKS
      ======================================== */}

      <section>


        {/* Header */}

        <div className="mb-4 flex items-end justify-between">

          <div>

            <h2 className="text-xl font-extrabold text-gray-800">
              Today's little things 🌸
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Small steps make a lovely day.
            </p>

          </div>


          {/* View all */}

          <button
            onClick={() =>
              navigate("/tasks")
            }
            className="hidden items-center gap-1 text-sm font-bold text-pink-400 transition hover:text-pink-500 sm:flex"
          >

            View all

            <ArrowRight size={16} />

          </button>

        </div>



        {/* ========================================
            TASK LOADING
        ======================================== */}

        {tasksLoading ? (

          <div className="rounded-[2rem] bg-pink-50 p-10 text-center">

            <div className="animate-pulse text-4xl">
              🌸
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Loading today's little plans...
            </p>

          </div>

        ) : tasks.length > 0 ? (

          /* ======================================
             TASK LIST
          ====================================== */

          <div className="space-y-3">

            {tasks
              .slice(0, 3)
              .map(task => (

                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={undefined}
                  readOnly={false}
                />

              ))}

          </div>

        ) : (

          /* ======================================
             EMPTY STATE
          ====================================== */

          <div className="rounded-[2rem] border border-dashed border-pink-200 bg-pink-50/40 p-8 text-center">

            <div className="text-4xl">
              🌷
            </div>

            <h3 className="mt-3 font-bold text-gray-700">
              No tasks yet
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Your little day is waiting for something lovely. 💕
            </p>


            <button
              onClick={() =>
                navigate("/tasks")
              }
              className="mt-5 rounded-2xl bg-pink-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-500"
            >
              Add your first task ✨
            </button>

          </div>

        )}

      </section>



      {/* ========================================
          CUTE MESSAGE
      ======================================== */}

      <CuteMessage
        emoji="💌"
        title="A little reminder"
        message="You don't have to do everything perfectly. Just take one little step at a time. 🌷"
      />

    </div>

  )
}


export default Home