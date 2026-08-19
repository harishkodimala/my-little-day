function AppCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-[2rem] border border-pink-50 bg-white shadow-sm transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  )
}

export default AppCard