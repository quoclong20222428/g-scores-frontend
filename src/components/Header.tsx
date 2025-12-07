import { Menu } from 'lucide-react'

interface HeaderProps {
  onToggleSidebar: () => void
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <div className="bg-gray-800 px-3 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-5 text-white flex items-center justify-between">
      <button
        onClick={onToggleSidebar}
        className="hover:bg-gray-700 p-2 rounded-md transition-colors cursor-pointer"
        title="Toggle sidebar"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-lg sm:text-2xl lg:text-3xl font-semibold flex-1 text-center">
        Welcome to G-Scores
      </h1>
      <div className="w-10"></div>
    </div>
  )
}

export default Header
