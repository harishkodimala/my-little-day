import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import {
  useEffect,
} from "react"

import {
  useAuth,
} from "./context/AuthContext"

import Layout from "./components/Layout"

import Home from "./pages/Home"
import Schedule from "./pages/Schedule"
import Tasks from "./pages/Tasks"
import Notes from "./pages/Notes"
import History from "./pages/History"
import Unlock from "./pages/Unlock"


function App() {

  const {
    unlocked,
    checkingAccess,
    checkAccess,
  } = useAuth()


  useEffect(() => {

    checkAccess()

  }, [])


  if (checkingAccess) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">

        <div className="text-center">

          <div className="animate-pulse text-5xl">
            🌸
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Preparing your little space...
          </p>

        </div>

      </div>
    )
  }


  if (!unlocked) {

    return (
      <Unlock />
    )
  }


  return (

    <BrowserRouter>

      <Layout>

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/schedule"
            element={<Schedule />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/notes"
            element={<Notes />}
          />

          <Route
            path="/history"
            element={<History />}
          />

        </Routes>

      </Layout>

    </BrowserRouter>
  )
}


export default App