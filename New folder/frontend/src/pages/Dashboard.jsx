import { useState, useEffect } from 'react'
import api from '../utils/api'
import { FiUsers, FiUserCheck, FiUserX, FiTrendingUp } from 'react-icons/fi'
import './Dashboard.css'

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    suspended: 0,
    recent: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/users/stats/overview')
      setStats(response.data.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: FiUsers,
      color: 'var(--primary-color)'
    },
    {
      title: 'Active Users',
      value: stats.active,
      icon: FiUserCheck,
      color: 'var(--success-color)'
    },
    {
      title: 'Inactive Users',
      value: stats.inactive,
      icon: FiUserX,
      color: 'var(--warning-color)'
    },
    {
      title: 'New (30 days)',
      value: stats.recent,
      icon: FiTrendingUp,
      color: 'var(--info-color)'
    }
  ]

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="dashboard">
      <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
      
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
              <card.icon />
            </div>
            <div className="stat-content">
              <div className="stat-value">{card.value}</div>
              <div className="stat-title">{card.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="card">
          <h2>Welcome to Admin Panel</h2>
          <p>Manage your users, view analytics, and configure settings from this dashboard.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

