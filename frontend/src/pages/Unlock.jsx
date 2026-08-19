import { useState } from "react"

import {
  Heart,
  LockKeyhole,
  Sparkles,
} from "lucide-react"

import { useAuth } from "../context/AuthContext"


function Unlock() {

  const {
    unlock,
  } = useAuth()


  const [code, setCode] =
    useState("")

  const [error, setError] =
    useState("")

  const [loading, setLoading] =
    useState(false)


  // ==========================================
  // UNLOCK
  // ==========================================

  const handleUnlock = async (e) => {

    e.preventDefault()


    if (!code.trim()) {

      setError(
        "Enter your little secret first 🌸"
      )

      return
    }


    try {

      setLoading(true)
      setError("")


      // AuthContext handles the API request

      await unlock(
        code.trim()
      )


      // App.jsx listens to the
      // unlocked state automatically.

    } catch (error) {

      console.error(
        "Unlock failed:",
        error
      )

      setError(
        error.response?.data?.message ||
        "That secret doesn't seem right 💕"
      )

    } finally {

      setLoading(false)

    }

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-5">

      <div className="flex min-h-screen items-center justify-center">

        <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-7 shadow-2xl backdrop-blur-xl sm:p-9">


          {/* =================================
              DECORATIVE CIRCLES
          ================================= */}

          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-pink-100/70" />

          <div className="absolute -bottom-14 -left-10 h-28 w-28 rounded-full bg-purple-100/70" />


          <div className="relative">


            {/* =================================
                LOCK ICON
            ================================= */}

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200">

              <LockKeyhole size={32} />

            </div>



            {/* =================================
                HEADING
            ================================= */}

            <div className="mt-6 text-center">

              <div className="flex items-center justify-center gap-2">

                <Sparkles
                  size={16}
                  className="text-pink-400"
                />

                <p className="text-sm font-semibold text-pink-400">
                  A little private place
                </p>

                <Sparkles
                  size={16}
                  className="text-pink-400"
                />

              </div>


              <h1 className="mt-3 text-3xl font-extrabold text-gray-800">
                Just for you 🌸
              </h1>


              <p className="mt-2 text-sm leading-6 text-gray-400">
                This little space is private.
                Enter the secret code to open it. ♡
              </p>

            </div>



            {/* =================================
                FORM
            ================================= */}

            <form
              onSubmit={handleUnlock}
              className="mt-7"
            >


              {/* Label */}

              <label
                htmlFor="secret-code"
                className="text-sm font-bold text-gray-600"
              >
                Secret code
              </label>



              {/* Input */}

              <input
                id="secret-code"
                type="password"
                autoFocus
                autoComplete="current-password"
                placeholder="Enter your secret..."
                value={code}
                onChange={(e) => {

                  setCode(
                    e.target.value
                  )

                  // Clear previous error
                  if (error) {
                    setError("")
                  }

                }}
                className="mt-2 w-full rounded-2xl border border-gray-100 bg-white px-4 py-3.5 text-gray-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-50"
              />



              {/* =================================
                  ERROR
              ================================= */}

              {error && (

                <div className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-500">

                  {error}

                </div>

              )}



              {/* =================================
                  UNLOCK BUTTON
              ================================= */}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 font-bold text-white shadow-md shadow-pink-100 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >

                {loading ? (

                  "Opening... 🌷"

                ) : (

                  <>

                    <Heart
                      size={18}
                      fill="currentColor"
                    />

                    Open my little space

                  </>

                )}

              </button>

            </form>



            {/* =================================
                FOOTER
            ================================= */}

            <p className="mt-6 text-center text-xs text-gray-300">
              A tiny place made with care ♡
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}


export default Unlock