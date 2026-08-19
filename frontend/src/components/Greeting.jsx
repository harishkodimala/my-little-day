import { getTodayDate, formatLongDate } from "../utils/date"

function Greeting() {

  const today = getTodayDate()
  const hour = new Date().getHours()

  let greeting
  let emoji

  if (hour < 12) {
    greeting = "Good morning"
    emoji = "🌤️"
  } else if (hour < 18) {
    greeting = "Good afternoon"
    emoji = "☀️"
  } else {
    greeting = "Good evening"
    emoji = "🌙"
  }

  return (
    <header>

      <p className="text-sm font-semibold text-pink-400">
        {formatLongDate(today)}
      </p>

      <div className="mt-1 flex items-center gap-2">

        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          {greeting}, Sunshine!
        </h1>

        <span className="text-2xl">
          {emoji}
        </span>

      </div>

      <p className="mt-2 text-sm text-gray-400 sm:text-base">
        Let's make today a lovely little day. 🌷
      </p>

    </header>
  )
}

export default Greeting