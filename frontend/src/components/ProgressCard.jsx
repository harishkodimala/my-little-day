function ProgressCard({
  completed,
  total,
}) {
  const progress =
    total === 0
      ? 0
      : Math.round((completed / total) * 100)

  const getMessage = () => {
    if (progress === 100) {
      return "You did everything! 🎉"
    }

    if (progress >= 75) {
      return "Almost there! 🌷"
    }

    if (progress >= 50) {
      return "You're doing great! ✨"
    }

    if (progress > 0) {
      return "Keep going, little by little 🌱"
    }

    return "Let's make today lovely 🌸"
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 shadow-sm">

      {/* Decorative circles */}

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/30" />

      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/20" />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-bold text-pink-500">
              Your day 🌱
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

        {/* Progress */}

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/70">

          <div
            className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="mt-3 flex items-center justify-between">

          <p className="text-sm text-gray-500">
            {completed} of {total} little things done
          </p>

          <p className="text-sm font-semibold text-pink-500">
            {getMessage()}
          </p>

        </div>

      </div>

    </section>
  )
}

export default ProgressCard