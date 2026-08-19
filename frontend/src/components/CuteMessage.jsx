import AppCard from "./AppCard"

function CuteMessage({
  emoji = "💌",
  title = "A little reminder",
  message = "Take it one step at a time. You're doing great! 🌷",
}) {
  return (
    <AppCard className="overflow-hidden bg-gradient-to-r from-yellow-50 to-orange-50 p-6 text-center">

      <div className="text-3xl">
        {emoji}
      </div>

      <h3 className="mt-2 font-bold text-gray-700">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {message}
      </p>

    </AppCard>
  )
}

export default CuteMessage