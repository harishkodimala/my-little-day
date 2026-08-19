import {
  Clock,
  ChevronRight,
} from "lucide-react"

import AppCard from "./AppCard"

function SchedulePreview({
  schedule,
}) {

  if (!schedule) {
    return (
      <AppCard className="p-5">

        <div className="text-center">

          <div className="text-3xl">
            🌙
          </div>

          <p className="mt-2 font-semibold text-gray-700">
            Nothing scheduled next
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Enjoy some free time ♡
          </p>

        </div>

      </AppCard>
    )
  }

  return (

    <AppCard className="overflow-hidden">

      <div className="flex items-center justify-between border-b border-gray-50 px-5 py-4">

        <div className="flex items-center gap-2">

          <Clock
            size={18}
            className="text-blue-400"
          />

          <h3 className="font-bold text-gray-700">
            Up next
          </h3>

        </div>

        <ChevronRight
          size={18}
          className="text-gray-300"
        />

      </div>


      <div className="flex items-center gap-4 p-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          {schedule.emoji}
        </div>

        <div className="min-w-0 flex-1">

          <p className="truncate font-bold text-gray-700">
            {schedule.title}
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Your next little plan
          </p>

        </div>

        <div className="rounded-xl bg-blue-50 px-3 py-2">

          <p className="text-sm font-bold text-blue-400">
            {schedule.time}
          </p>

        </div>

      </div>

    </AppCard>
  )
}

export default SchedulePreview