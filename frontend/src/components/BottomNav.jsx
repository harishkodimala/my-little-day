import {
  Home,
  CalendarDays,
  CheckSquare,
  NotebookPen,
  History as HistoryIcon,
  LockKeyhole,
} from "lucide-react"

import { NavLink } from "react-router-dom"

import { useAuth } from "../context/AuthContext"


function BottomNav() {

  const {
    lock,
  } = useAuth()


  const links = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: CalendarDays,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
    {
      name: "History",
      path: "/history",
      icon: HistoryIcon,
    },
  ]


  const handleLock = async () => {

    try {

      await lock()

    } catch (error) {

      console.error(
        "Failed to lock app:",
        error
      )

    }

  }


  return (

    <>
      {/* Mobile lock button */}

      <button
        onClick={handleLock}
        className="fixed bottom-[4.7rem] right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-pink-100 bg-white text-pink-400 shadow-md transition hover:scale-105 hover:bg-pink-50 active:scale-95 md:hidden"
        aria-label="Lock private space"
      >

        <LockKeyhole size={18} />

      </button>


      {/* Mobile navigation */}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-pink-100 bg-white/95 backdrop-blur md:hidden">

        <div className="flex items-center justify-between px-1 py-3">

          {links.map(link => {

            const Icon = link.icon

            return (

              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[11px] transition ${
                    isActive
                      ? "font-semibold text-pink-500"
                      : "text-gray-400"
                  }`
                }
              >

                <Icon size={20} />

                <span className="truncate">
                  {link.name}
                </span>

              </NavLink>

            )

          })}

        </div>

      </nav>
    </>

  )
}


export default BottomNav