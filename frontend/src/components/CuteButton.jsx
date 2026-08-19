import { Plus } from "lucide-react"

function CuteButton({
  children = "Add",
  onClick,
  icon = true,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
    >

      {icon && <Plus size={18} />}

      {children}

    </button>
  )
}

export default CuteButton