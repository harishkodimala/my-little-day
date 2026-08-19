import { useEffect, useMemo } from "react"

import {
  CalendarDays,
  CheckCircle2,
  History as HistoryIcon,
  Sparkles,
} from "lucide-react"

import { useApp } from "../context/AppContext"


function History() {

  // ==========================================
  // APP CONTEXT
  // ==========================================

  const {
    taskHistory,
    historyLoading,
    historyError,
    fetchTaskHistory,
  } = useApp()


  // ==========================================
  // LOAD HISTORY
  // ==========================================

  useEffect(() => {

    fetchTaskHistory()

  }, [])


  // ==========================================
  // GROUP TASKS BY DATE
  // ==========================================

  const groupedHistory = useMemo(() => {

    const groups = {}

    taskHistory.forEach(task => {

      if (!task.date) {
        return
      }

      if (!groups[task.date]) {
        groups[task.date] = []
      }

      groups[task.date].push(task)

    })

    return Object.entries(groups)
      .sort(([dateA], [dateB]) =>
        dateB.localeCompare(dateA)
      )

  }, [taskHistory])


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatHistoryDate = (dateString) => {

    const date = new Date(
      `${dateString}T00:00:00`
    )

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    )

  }


  // ==========================================
  // TOTAL COMPLETED
  // ==========================================

  const totalCompleted =
    taskHistory.length


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
            Little moments worth remembering
          </p>

        </div>


        <div className="mt-2 flex items-center gap-3">

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
            Little History 📖
          </h1>

          <HistoryIcon
            size={27}
            className="text-purple-300"
          />

        </div>


        <p className="mt-1 text-sm text-gray-400 sm:text-base">
          A collection of completed little things. ♡
        </p>

      </header>



      {/* ========================================
          SUMMARY CARD
      ======================================== */}

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 shadow-sm">

        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/30" />

        <div className="absolute -bottom-10 -left-5 h-24 w-24 rounded-full bg-white/20" />


        <div className="relative flex items-center justify-between gap-4">

          <div>

            <p className="text-sm font-bold text-pink-500">
              Completed little moments 🌱
            </p>

            <p className="mt-2 text-4xl font-extrabold text-gray-800">
              {totalCompleted}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {totalCompleted === 1
                ? "task completed"
                : "tasks completed"}
            </p>

          </div>


          <div className="text-5xl">
            🌷
          </div>

        </div>

      </section>



      {/* ========================================
          ERROR
      ======================================== */}

      {historyError && (

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {historyError}
        </div>

      )}



      {/* ========================================
          LOADING
      ======================================== */}

      {historyLoading ? (

        <div className="rounded-[2rem] bg-pink-50 p-10 text-center">

          <div className="animate-pulse text-4xl">
            📖
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Looking through your little memories...
          </p>

        </div>

      ) : groupedHistory.length > 0 ? (

        <div className="space-y-6">

          {groupedHistory.map(
            ([date, tasks]) => (

              <section
                key={date}
                className="rounded-[2rem] border border-pink-50 bg-white p-5 shadow-sm sm:p-6"
              >

                {/* Date header */}

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-50">

                    <CalendarDays
                      size={21}
                      className="text-pink-400"
                    />

                  </div>


                  <div>

                    <h2 className="font-extrabold text-gray-700">
                      {formatHistoryDate(date)}
                    </h2>

                    <p className="text-xs text-gray-400">
                      {tasks.length}{" "}
                      {tasks.length === 1
                        ? "little thing"
                        : "little things"}{" "}
                      completed ✨
                    </p>

                  </div>

                </div>


                {/* Timeline */}

                <div className="relative mt-5 space-y-3">


                  {/* Timeline line */}

                  <div className="absolute bottom-5 left-5 top-5 hidden w-px bg-pink-100 sm:block" />


                  {tasks.map(task => (

                    <div
                      key={task._id}
                      className="relative flex items-center gap-3 rounded-2xl bg-gray-50/80 p-3 transition hover:bg-pink-50/50"
                    >

                      {/* Status */}

                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">

                        <CheckCircle2
                          size={20}
                          className="text-green-400"
                        />

                      </div>


                      {/* Emoji */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                        {task.emoji}
                      </div>


                      {/* Content */}

                      <div className="min-w-0 flex-1">

                        <p className="truncate font-semibold text-gray-700">
                          {task.title}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-500">
                            Completed
                          </span>

                          {task.completedAt && (

                            <span className="text-[11px] text-gray-400">
                              {formatCompletedTime(
                                task.completedAt
                              )}
                            </span>

                          )}

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </section>

            )
          )}

        </div>

      ) : (

        /* ========================================
           EMPTY STATE
        ======================================== */

        <div className="rounded-[2rem] border border-dashed border-pink-200 bg-pink-50/40 p-10 text-center">

          <div className="text-5xl">
            🌱
          </div>

          <h3 className="mt-4 font-extrabold text-gray-700">
            Your history is waiting
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-gray-400">
            Complete your first little task and it will appear here. ♡
          </p>

        </div>

      )}

    </div>

  )
}


// ==========================================
// FORMAT COMPLETION TIME
// ==========================================

function formatCompletedTime(dateString) {

  const date = new Date(dateString)

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  )

}


export default History