import { useEffect, useState } from "react"

import {
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react"

import { useApp } from "../context/AppContext"


function Notes() {

  // ==========================================
  // APP CONTEXT
  // ==========================================

  const {
    notes,
    notesLoading,
    notesError,
    fetchNotes,
    addNote,
    deleteNote,
  } = useApp()


  // ==========================================
  // MODAL
  // ==========================================

  const [showForm, setShowForm] =
    useState(false)


  // ==========================================
  // NEW NOTE
  // ==========================================

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    emoji: "🌸",
    color: "pink",
  })


  // ==========================================
  // LOAD NOTES
  // ==========================================

  useEffect(() => {

    fetchNotes()

  }, [])


  // ==========================================
  // NOTE COLORS
  // ==========================================

  const noteColors = {

    pink:
      "bg-pink-50 border-pink-100",

    yellow:
      "bg-yellow-50 border-yellow-100",

    purple:
      "bg-purple-50 border-purple-100",

    blue:
      "bg-blue-50 border-blue-100",

    green:
      "bg-green-50 border-green-100",

  }


  // ==========================================
  // ADD NOTE
  // ==========================================

  const handleAddNote = async () => {

    if (
      !newNote.title.trim() &&
      !newNote.content.trim()
    ) {
      return
    }


    try {

      await addNote({

        title:
          newNote.title.trim() ||
          "Little thought",

        content:
          newNote.content.trim(),

        emoji:
          newNote.emoji,

        color:
          newNote.color,

      })


      // Reset form

      setNewNote({
        title: "",
        content: "",
        emoji: "🌸",
        color: "pink",
      })


      setShowForm(false)

    } catch (error) {

      console.error(
        "Failed to add note:",
        error
      )

    }

  }


  return (

    <div className="relative space-y-7 pb-8">


      {/* ========================================
          HEADER
      ======================================== */}

      <header>

        <div className="flex items-center gap-2">

          <Sparkles
            size={17}
            className="text-pink-400"
          />

          <p className="text-sm font-semibold text-pink-400">
            Little thoughts matter
          </p>

        </div>


        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
          Little Notes 📝
        </h1>


        <p className="mt-1 text-sm text-gray-400 sm:text-base">
          Things worth remembering ♡
        </p>

      </header>



      {/* ========================================
          ERROR
      ======================================== */}

      {notesError && (

        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-500">
          {notesError}
        </div>

      )}



      {/* ========================================
          NOTES HEADER
      ======================================== */}

      <div className="flex items-end justify-between">

        <div>

          <h2 className="text-xl font-extrabold text-gray-800">
            Your little thoughts
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Keep the things that matter close. 🌷
          </p>

        </div>


        {/* Desktop add button */}

        <button
          onClick={() => setShowForm(true)}
          className="hidden items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:flex"
        >

          <Plus size={18} />

          Add note

        </button>

      </div>



      {/* ========================================
          LOADING
      ======================================== */}

      {notesLoading ? (

        <div className="rounded-[2rem] bg-pink-50 p-10 text-center">

          <div className="animate-pulse text-4xl">
            💌
          </div>

          <p className="mt-3 text-sm text-gray-400">
            Loading your little notes...
          </p>

        </div>

      ) : notes.length > 0 ? (

        /* ========================================
           NOTES GRID
        ======================================== */

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {notes.map(note => (

            <article
              key={note._id}
              className={`group relative overflow-hidden rounded-[2rem] border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] hover:shadow-lg ${
                noteColors[note.color] ||
                noteColors.pink
              }`}
            >


              {/* Decorative circle */}

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-white/40" />


              {/* Top */}

              <div className="relative flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-2xl shadow-sm">

                  {note.emoji}

                </div>


                {/* Delete */}

                <button
                  onClick={() =>
                    deleteNote(note._id)
                  }
                  className="rounded-xl p-2 text-gray-300 transition hover:bg-white hover:text-red-400 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label={`Delete ${note.title}`}
                >

                  <Trash2 size={17} />

                </button>

              </div>


              {/* Content */}

              <div className="relative mt-5">

                <h3 className="font-extrabold text-gray-700">
                  {note.title}
                </h3>


                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-500">
                  {note.content}
                </p>

              </div>


              {/* Date */}

              <p className="relative mt-6 text-xs font-medium text-gray-400">

                {formatNoteDate(note.createdAt)} ♡

              </p>

            </article>

          ))}

        </div>

      ) : (

        /* ========================================
           EMPTY STATE
        ======================================== */

        <div className="rounded-[2rem] border border-dashed border-pink-200 bg-pink-50/40 p-10 text-center">

          <div className="text-5xl">
            💭
          </div>

          <h3 className="mt-4 font-extrabold text-gray-700">
            No little notes yet
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Write down something worth remembering. 🌷
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-5 rounded-2xl bg-pink-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-500"
          >
            Write the first note ✨
          </button>

        </div>

      )}



      {/* ========================================
          MOBILE ADD BUTTON
      ======================================== */}

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg shadow-pink-200 transition hover:scale-105 active:scale-95 sm:hidden"
        aria-label="Add note"
      >

        <Plus size={25} />

      </button>



      {/* ========================================
          NOTE MODAL
      ======================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">


            {/* Modal header */}

            <div className="flex items-start justify-between">

              <div>

                <div className="text-3xl">
                  💌
                </div>

                <h2 className="mt-2 text-xl font-extrabold text-gray-800">
                  Write a little note
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Something just for you. ♡
                </p>

              </div>


              <button
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-xl px-2 text-xl text-gray-300 transition hover:bg-gray-50 hover:text-gray-500"
                aria-label="Close"
              >
                ×
              </button>

            </div>



            {/* ====================================
                TITLE
            ==================================== */}

            <div className="mt-6">

              <label
                htmlFor="note-title"
                className="text-sm font-bold text-gray-600"
              >
                Title
              </label>


              <input
                id="note-title"
                type="text"
                autoFocus
                placeholder="e.g. Remember this..."
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({
                    ...newNote,
                    title: e.target.value,
                  })
                }
                className="mt-2 w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50"
              />

            </div>



            {/* ====================================
                CONTENT
            ==================================== */}

            <div className="mt-5">

              <label
                htmlFor="note-content"
                className="text-sm font-bold text-gray-600"
              >
                Your note
              </label>


              <textarea
                id="note-content"
                rows="5"
                placeholder="Write whatever is on your mind..."
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({
                    ...newNote,
                    content: e.target.value,
                  })
                }
                className="mt-2 w-full resize-none rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-50"
              />

            </div>



            {/* ====================================
                EMOJI
            ==================================== */}

            <div className="mt-5">

              <label className="text-sm font-bold text-gray-600">
                Pick a little emoji
              </label>


              <div className="mt-2 flex flex-wrap gap-2">

                {[
                  "🌸",
                  "💭",
                  "❤️",
                  "🌷",
                  "✨",
                  "☀️",
                  "🌙",
                  "☕",
                  "🌱",
                  "🧸",
                ].map(emoji => (

                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      setNewNote({
                        ...newNote,
                        emoji,
                      })
                    }
                    className={`rounded-xl p-2 text-xl transition ${
                      newNote.emoji === emoji
                        ? "bg-pink-100 ring-2 ring-pink-300"
                        : "bg-gray-50 hover:bg-pink-50"
                    }`}
                  >
                    {emoji}
                  </button>

                ))}

              </div>

            </div>



            {/* ====================================
                COLOR
            ==================================== */}

            <div className="mt-5">

              <label className="text-sm font-bold text-gray-600">
                Pick a color
              </label>


              <div className="mt-2 flex gap-3">

                {[
                  {
                    name: "pink",
                    className: "bg-pink-100",
                  },
                  {
                    name: "yellow",
                    className: "bg-yellow-100",
                  },
                  {
                    name: "purple",
                    className: "bg-purple-100",
                  },
                  {
                    name: "blue",
                    className: "bg-blue-100",
                  },
                  {
                    name: "green",
                    className: "bg-green-100",
                  },
                ].map(color => (

                  <button
                    key={color.name}
                    type="button"
                    onClick={() =>
                      setNewNote({
                        ...newNote,
                        color: color.name,
                      })
                    }
                    className={`h-9 w-9 rounded-full ${color.className} transition hover:scale-110 ${
                      newNote.color === color.name
                        ? "ring-2 ring-pink-300 ring-offset-2"
                        : ""
                    }`}
                    aria-label={`Use ${color.name}`}
                  />

                ))}

              </div>

            </div>



            {/* ====================================
                SAVE
            ==================================== */}

            <button
              onClick={handleAddNote}
              disabled={
                !newNote.title.trim() &&
                !newNote.content.trim()
              }
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 py-3.5 font-bold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save note ♡
            </button>

          </div>

        </div>

      )}

    </div>

  )
}


// ==========================================
// FORMAT NOTE DATE
// ==========================================

function formatNoteDate(date) {

  if (!date) {
    return "Today"
  }

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  )
}


export default Notes