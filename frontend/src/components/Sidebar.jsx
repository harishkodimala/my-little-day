import {
  Home,
  CalendarDays,
  CheckSquare,
  NotebookPen,
  History as HistoryIcon,
  Heart,
  LockKeyhole,
} from "lucide-react"

import { NavLink } from "react-router-dom"

import { useAuth } from "../context/AuthContext"


function Sidebar() {

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

    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-pink-100 bg-white md:block">

      <div className="flex h-full flex-col p-6">


        {/* Logo */}

        <div className="mb-8">

          <h1 className="text-2xl font-bold text-pink-500">
            My Little Day 🌸
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            A little space for you ♡
          </p>

        </div>


        {/* Navigation */}

        <nav className="space-y-2">

          {links.map(link => {

            const Icon = link.icon

            return (

              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                    isActive
                      ? "bg-pink-100 text-pink-600"
                      : "text-gray-500 hover:bg-pink-50"
                  }`
                }
              >

                <Icon size={20} />

                <span className="font-medium">
                  {link.name}
                </span>

              </NavLink>

            )

          })}

        </nav>


        {/* Lock button */}

        <button
          onClick={handleLock}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 px-4 py-3 text-sm font-semibold text-pink-500 transition hover:bg-pink-100 hover:text-pink-600"
        >

          <LockKeyhole size={19} />

          Lock private space

        </button>


        {/* Bottom message */}

        <div className="mt-auto rounded-3xl bg-pink-50 p-4 text-center">

          <Heart
            size={20}
            className="mx-auto mb-2 text-pink-400"
            fill="currentColor"
          />

          <p className="text-sm text-pink-500">
            Take it one step at a time 🌷
          </p>

        </div>

      </div>

    </aside>

  )
}


export default Sidebar