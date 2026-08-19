import {
  Check,
  Trash2,
  Circle,
} from "lucide-react"


function TaskCard({
  task,
  onToggle,
  onDelete,
  readOnly = false,
}) {

  const priorityStyle = {
    Easy:
      "bg-green-50 text-green-500",

    Medium:
      "bg-yellow-50 text-yellow-500",

    High:
      "bg-pink-50 text-pink-500",
  }


  return (

    <div
      className={`group rounded-[1.5rem] border bg-white p-4 shadow-sm transition-all duration-300 ${
        readOnly
          ? "cursor-default"
          : "hover:-translate-y-1 hover:shadow-lg"
      } ${
        task.completed
          ? "border-green-100 bg-green-50/30"
          : "border-pink-50"
      }`}
    >

      <div className="flex items-center gap-4">


        {/* COMPLETE / TOGGLE */}

        <button
          onClick={() => {
            if (!readOnly && onToggle) {
              onToggle(task._id)
            }
          }}
          disabled={readOnly}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            task.completed

              ? "border-green-400 bg-green-400 text-white"

              : readOnly

              ? "cursor-not-allowed border-gray-200 bg-gray-100"

              : "border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50"
          }`}
          aria-label={
            readOnly
              ? "Historical task"
              : task.completed
              ? "Mark task as incomplete"
              : "Mark task as complete"
          }
        >

          {task.completed ? (

            <Check size={17} />

          ) : (

            <Circle
              size={9}
              className="text-transparent"
            />

          )}

        </button>



        {/* EMOJI */}

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-2xl">
          {task.emoji}
        </div>



        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          <p
            className={`truncate font-semibold ${
              task.completed
                ? "text-gray-400 line-through"
                : "text-gray-700"
            }`}
          >
            {task.title}
          </p>


          <span
            className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
              priorityStyle[task.priority] ||
              priorityStyle.Easy
            }`}
          >
            {task.priority}
          </span>


          {readOnly && (

            <span className="ml-2 inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-400">
              History 🔒
            </span>

          )}

        </div>



        {/* DELETE */}

        {!readOnly &&
          !task.completed &&
          onDelete && (

            <button
              onClick={() =>
                onDelete(task._id)
              }
              className="rounded-xl p-2 text-gray-300 opacity-0 transition hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
              aria-label={`Delete ${task.title}`}
            >

              <Trash2 size={17} />

            </button>

          )}

      </div>

    </div>

  )
}


export default TaskCard