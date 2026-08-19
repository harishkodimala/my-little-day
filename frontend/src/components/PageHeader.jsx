import { Sparkles } from "lucide-react"

function PageHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <header>

      {eyebrow && (
        <div className="flex items-center gap-2">

          <Sparkles
            size={16}
            className="text-pink-400"
          />

          <p className="text-sm font-semibold text-pink-400">
            {eyebrow}
          </p>

        </div>
      )}

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
        {title}
      </h1>

      {description && (
        <p className="mt-1 text-sm text-gray-400 sm:text-base">
          {description}
        </p>
      )}

    </header>
  )
}

export default PageHeader