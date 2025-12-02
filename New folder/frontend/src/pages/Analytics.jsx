import { useState, useEffect } from 'react'
import api from '../utils/api'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './Analytics.css'

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await api.get('/logs/analytics', { params: { period } })
      setAnalytics(response.data.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const activityData = analytics?.activityLogs?.map(item => ({
    date: item._id,
    count: item.count
  })) || []

  const loginData = analytics?.loginLogs?.map(item => ({
    date: item._id,
    successful: item.successful,
    failed: item.failed
  })) || []

  const resourceData = analytics?.activityByResource?.map(item => ({
    resource: item._id,
    count: item.count
  })) || []

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Analytics</h1>
        <select 
          value={period} 
          onChange={(e) => setPeriod(e.target.value)}
          className="input"
          style={{ width: 'auto' }}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="charts-grid">
        <div className="card">
          <h2>Activity Logs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="var(--primary-color)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h2>Login Logs</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loginData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="successful" fill="var(--success-color)" />
              <Bar dataKey="failed" fill="var(--danger-color)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>Activity by Resource</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="resource" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="var(--secondary-color)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics

