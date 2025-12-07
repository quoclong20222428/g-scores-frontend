import { LayoutDashboard, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface SidebarProps {
  isOpen: boolean
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/', Icon: LayoutDashboard },
    { name: 'Search Scores', path: '/search', Icon: Search },
  ]

  return (
    <aside
      className={`bg-gray-700 text-white min-h-screen p-4 transition-all duration-300 ease-in-out rounded-r-md mr-2 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="mb-8">
        {isOpen && <h2 className="text-xl font-bold">Menu</h2>}
      </div>

      <nav className="space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-gray-200 hover:bg-gray-600'
            }`}
            title={!isOpen ? item.name : ''}
          >
            <item.Icon size={24} />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
