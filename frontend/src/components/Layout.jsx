import Sidebar from "./Sidebar"
import BottomNav from "./BottomNav"

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#fff8fb] text-[#40354a]">

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="pb-24 md:ml-64 md:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

    </div>
  )
}

export default Layout