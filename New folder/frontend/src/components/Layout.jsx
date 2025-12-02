import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

