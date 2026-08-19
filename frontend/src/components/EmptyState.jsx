import AppCard from "./AppCard"

function EmptyState({
  emoji = "🌷",
  title = "Nothing here yet",
  description = "Add something small to your day.",
  buttonText = "Add something ✨",
  onClick,
}) {
  return (
    <AppCard className="border-dashed border-pink-200 bg-pink-50/40 p-10 text-center">

      <div className="text-5xl">
        {emoji}
      </div>

      <h3 className="mt-4 font-bold text-gray-700">
        {title}
      </h3>

      <p className="mt-1 text-sm text-gray-400">
        {description}
      </p>

      {onClick && (
        <button
          onClick={onClick}
          className="mt-5 rounded-2xl bg-pink-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-500"
        >
          {buttonText}
        </button>
      )}

    </AppCard>
  )
}

export default EmptyState