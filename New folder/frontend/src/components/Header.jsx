import { FiMenu, FiSun, FiMoon, FiBell } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import './Header.css'

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="header">
      <button className="menu-btn" onClick={onMenuClick}>
        <FiMenu />
      </button>
      <div style={{ flex: 1 }} />
      <div className="header-actions">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
        <button className="icon-btn">
          <FiBell />
        </button>
      </div>
    </header>
  )
}

export default Header

