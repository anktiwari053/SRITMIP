import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiBarChart2, 
  FiX,
  FiLogOut 
} from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { admin, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const navItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/users', icon: FiUsers, label: 'Users' },
    { path: '/analytics', icon: FiBarChart2, label: 'Analytics' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ]

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button 
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            <FiX />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="admin-info">
            <div className="admin-avatar">
              {admin?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="admin-name">{admin?.name}</div>
              <div className="admin-email">{admin?.email}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

