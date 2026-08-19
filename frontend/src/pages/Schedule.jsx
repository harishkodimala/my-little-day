import { useEffect, useState } from "react"

import {
  Plus,
  Clock3,
  CalendarDays,
  Trash2,
  Sparkles,
} from "lucide-react"

import { useApp } from "../context/AppContext"

import {
  getTodayDate,
  addDays,
  formatLongDate,
} from "../utils/date"

import useToday from "../hooks/useToday"

function Schedule() {

  // ==========================================
  // APP CONTEXT
  // ==========================================

  const {
    schedules,
    schedulesLoading,
    schedulesError,
    fetchSchedules,
    addSchedule,
    deleteSchedule,
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


  const [newSchedule, setNewSchedule] =
    useState({
      title: "",
      time: "",
      emoji: "🌸",
    })


  // ==========================================
  // FETCH SELECTED DATE
  // ==========================================

  useEffect(() => {

    fetchSchedules(selectedDate)

  }, [selectedDate])


  // ==========================================
  // EMOJIS
  // ==========================================

  const emojis = [
    "🌸",
    "📚",
    "💻",
    "☕",
    "🍱",
    "🌿",
    "🏃",
    "🎵",
    "🌙",
    "❤️",
    "🧘",
    "🎨",
  ]


  // ==========================================
  // ADD SCHEDULE
  // ==========================================

  const handleAddSchedule = async () => {

    if (
      !newSchedule.title.trim() ||
      !newSchedule.time
    ) {
      return
    }


    try {

      await addSchedule({

        title:
          newSchedule.title.trim(),

        time:
          formatTime(newSchedule.time),

        emoji:
          newSchedule.emoji,

        date:
          selectedDate,

      })


      setNewSchedule({
        title: "",
        time: "",
        emoji: "🌸",
      })


      setShowForm(false)

    } catch (error) {

      console.error(
        "Failed to add schedule:",
        error
      )

    }

  }


  // ==========================================
  // SORT SCHEDULES
  // ==========================================

  const sortedSchedules =
    [...schedules].sort(
      (a, b) =>
        convertToMinutes(a.time) -
        convertToMinutes(b.time)
    )


  return (

    <div className="space-y-7 pb-8">


      {/* ========================================
          HEADER
      ======================================== */}

      <header>

        <div className="flex items-center gap-2">

          <Sparkles
            size={17}
            className="text-pink-400"
          />

          <p className="text-sm font-semibold text-pink-400">
            Plan your little day
          </p>

        </div>


        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          My Schedule 📅
        </h1>


        <p className="mt-1 text-sm text-gray-400 sm:text-base">
          Give every little moment its place. 🌷
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
            className={`whitespace-nowrap rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 ${
              selectedDate === day.date
                ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-100"
                : "bg-white text-gray-400 shadow-sm hover:bg-pink-50 hover:text-pink-400"
            }`}
          >
            {day.label}
          </button>

        ))}

      </div>



      {/* ========================================
          DATE CARD
      ======================================== */}

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-5 shadow-sm sm:p-6">

        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30" />

        <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-white/20" />


        <div className="relative flex items-center gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">

            <CalendarDays
              size={25}
              className="text-pink-400"
            />

          </div>


          <div className="min-w-0">

            <p className="text-sm font-medium text-gray-500">
              {dayOptions.find(
                day => day.date === selectedDate
              )?.label}
            </p>

            <h2 className="truncate font-extrabold text-gray-700">
              {formatLongDate(selectedDate)}
            </h2>

            <p className="mt-0.5 text-xs text-gray-400">
              Plan a lovely little day ♡
            </p>

          </div>

        </div>

      </section>



      {/* ========================================
          ERROR
      ======================================== */}

      {schedulesError && (

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {schedulesError}
        </div>

      )}



      {/* ========================================
          SECTION HEADER
      ======================================== */}

      <div className="flex items-end justify-between">

        <div>

          <h2 className="text-xl font-extrabold text-gray-800">
            {selectedDate === today
              ? "Today's plan 🌸"
              : "Little plans 🌸"}
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {schedules.length}{" "}
            {schedules.length === 1
              ? "little plan"
              : "little plans"}
          </p>

        </div>


        {/* Add only for today */}

        {selectedDate === today && (

          <button
            onClick={() => setShowForm(true)}
            className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex"
          >

            <Plus size={18} />

            Add plan

          </button>

        )}

      </div>



      {/* ========================================
          LOADING
      ======================================== */}

      {schedulesLoading ? (

        <div className="rounded-[2rem] bg-pink-50 p-10 text-center">

          <div className="animate-pulse text-4xl">
            🌸
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Loading your little plans...
          </p>

        </div>

      ) : schedules.length > 0 ? (

        /* ========================================
           TIMELINE
        ======================================== */

        <div className="relative space-y-4">

          <div className="absolute bottom-6 left-[5.3rem] top-6 hidden w-px bg-pink-100 sm:block" />


          {sortedSchedules.map(schedule => (

            <div
              key={schedule._id}
              className="group relative flex gap-3"
            >


              {/* Time */}

              <div className="w-20 shrink-0 pt-5 text-right text-xs font-bold text-gray-400 sm:text-sm">

                {schedule.time}

              </div>


              {/* Timeline */}

              <div className="relative z-10 hidden pt-5 sm:block">

                <div className="h-3 w-3 rounded-full bg-pink-300 ring-4 ring-[#fff8fb]" />

              </div>


              {/* Schedule card */}

              <div className="min-w-0 flex-1">

                <div className="relative overflow-hidden rounded-[1.75rem] border border-pink-50 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <div className="absolute -right-7 -top-7 h-20 w-20 rounded-full bg-pink-50/70" />


                  <div className="relative flex items-center gap-3 sm:gap-4">


                    {/* Emoji */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-2xl">

                      {schedule.emoji}

                    </div>


                    {/* Content */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate font-bold text-gray-700">
                        {schedule.title}
                      </p>

                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">

                        <Clock3 size={12} />

                        Little plan

                      </div>

                    </div>


                    {/* Delete only today */}

                    {selectedDate === today && (

                      <button
                        onClick={() =>
                          deleteSchedule(
                            schedule._id
                          )
                        }
                        className="rounded-xl p-2 text-gray-300 transition hover:bg-red-50 hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label={`Delete ${schedule.title}`}
                      >

                        <Trash2 size={17} />

                      </button>

                    )}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      ) : (

        /* ========================================
           EMPTY STATE
        ======================================== */

        <div className="rounded-[2rem] border border-dashed border-pink-200 bg-pink-50/40 p-10 text-center">

          <div className="text-5xl">
            🌷
          </div>

          <h3 className="mt-4 font-extrabold text-gray-700">
            Your day is wide open
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm text-gray-400">
            {selectedDate === today
              ? "Add a little plan and make the day yours. 💕"
              : "Nothing was planned for this day. 🌱"}
          </p>

          {selectedDate === today && (

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Add first plan ✨
            </button>

          )}

        </div>

      )}



      {/* ========================================
          MOBILE ADD BUTTON
      ======================================== */}

      {selectedDate === today && (

        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200 transition hover:scale-105 active:scale-95 sm:hidden"
          aria-label="Add schedule"
        >

          <Plus size={25} />

        </button>

      )}



      {/* ========================================
          ADD SCHEDULE MODAL
      ======================================== */}

      {showForm && selectedDate === today && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">


            {/* Header */}

            <div className="flex items-start justify-between">

              <div>

                <div className="text-3xl">
                  🌸
                </div>

                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  Add a little plan
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Give this moment a place in your day.
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



            {/* Activity */}

            <div className="mt-6">

              <label
                htmlFor="schedule-title"
                className="text-sm font-bold text-gray-600"
              >
                What are you planning?
              </label>


              <input
                id="schedule-title"
                type="text"
                autoFocus
                placeholder="e.g. Study Java"
                value={newSchedule.title}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    title: e.target.value,
                  })
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleAddSchedule()
                  }

                }}
                className="mt-2 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50"
              />

            </div>



            {/* Time */}

            <div className="mt-5">

              <label
                htmlFor="schedule-time"
                className="text-sm font-bold text-gray-600"
              >
                What time?
              </label>


              <input
                id="schedule-time"
                type="time"
                value={newSchedule.time}
                onChange={(e) =>
                  setNewSchedule({
                    ...newSchedule,
                    time: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50"
              />

            </div>



            {/* Emoji */}

            <div className="mt-5">

              <label className="text-sm font-bold text-gray-600">
                Pick an emoji
              </label>


              <div className="mt-2 flex flex-wrap gap-2">

                {emojis.map(emoji => (

                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setNewSchedule({
                        ...newSchedule,
                        emoji,
                      })
                    }
                    className={`rounded-xl p-2 text-xl transition-all ${
                      newSchedule.emoji === emoji
                        ? "bg-pink-100 ring-2 ring-pink-300"
                        : "bg-gray-50 hover:scale-105 hover:bg-pink-50"
                    }`}
                  >
                    {emoji}
                  </button>

                ))}

              </div>

            </div>



            {/* Save */}

            <button
              onClick={handleAddSchedule}
              disabled={
                !newSchedule.title.trim() ||
                !newSchedule.time
              }
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 font-bold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add to my day ✨
            </button>

          </div>

        </div>

      )}

    </div>

  )
}


// ==========================================
// FORMAT TIME
// ==========================================

function formatTime(time) {

  if (!time) {
    return ""
  }

  const [hourString, minute] =
    time.split(":")

  let hour = Number(hourString)

  const period =
    hour >= 12
      ? "PM"
      : "AM"

  hour =
    hour % 12 || 12

  return `${hour}:${minute} ${period}`
}


// ==========================================
// CONVERT TIME TO MINUTES
// ==========================================

function convertToMinutes(time) {

  if (!time) {
    return 0
  }


  const match = time.match(
    /(\d{1,2}):(\d{2})\s*(AM|PM)/i
  )


  if (!match) {
    return 0
  }


  let hour = Number(match[1])

  const minute =
    Number(match[2])

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


  return hour * 60 + minute
}


export default Schedule