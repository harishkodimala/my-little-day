// ==========================================
// GET TODAY'S DATE
// Returns: YYYY-MM-DD
// ==========================================

export function getTodayDate() {

  const today = new Date()

  const year = today.getFullYear()

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0")

  const day = String(
    today.getDate()
  ).padStart(2, "0")

  return `${year}-${month}-${day}`
}


// ==========================================
// ADD / SUBTRACT DAYS
// Example:
// addDays("2026-08-18", 1)
// → "2026-08-19"
// ==========================================

export function addDays(
  dateString = getTodayDate(),
  amount = 0
) {

  const date = new Date(
    `${dateString}T00:00:00`
  )

  date.setDate(
    date.getDate() + amount
  )

  const year = date.getFullYear()

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0")

  const day = String(
    date.getDate()
  ).padStart(2, "0")

  return `${year}-${month}-${day}`
}


// ==========================================
// FORMAT LONG DATE
// Example:
// Tuesday, August 18, 2026
// ==========================================

export function formatLongDate(
  dateString = getTodayDate()
) {

  const date = new Date(
    `${dateString}T00:00:00`
  )

  return date.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  )
}


// ==========================================
// FORMAT SHORT DATE
// Example:
// Aug 18
// ==========================================

export function formatShortDate(
  dateString = getTodayDate()
) {

  const date = new Date(
    `${dateString}T00:00:00`
  )

  return date.toLocaleDateString(
    "en-IN",
    {
      month: "short",
      day: "numeric",
    }
  )
}