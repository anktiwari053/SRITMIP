import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import './Settings.css'

const Settings = () => {
  const { admin } = useAuth()
  const [settings, setSettings] = useState({
    siteName: '',
    siteEmail: '',
    maintenanceMode: false,
    maxLoginAttempts: 5,
    sessionTimeout: 3600,
    theme: 'light'
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings')
      setSettings(response.data.data.settings)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const handleSettingsChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSettingsSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    try {
      await api.put('/settings', settings)
      setMessage('Settings updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update settings')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    
    try {
      await api.put('/auth/updatepassword', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })
      setMessage('Password updated successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="settings-page">
      <h1 style={{ marginBottom: '2rem' }}>Settings</h1>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="settings-grid">
        <div className="card">
          <h2>Profile Information</h2>
          <div className="profile-info">
            <div className="info-item">
              <label>Name</label>
              <div>{admin?.name}</div>
            </div>
            <div className="info-item">
              <label>Email</label>
              <div>{admin?.email}</div>
            </div>
            <div className="info-item">
              <label>Role</label>
              <div style={{ textTransform: 'capitalize' }}>{admin?.role}</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="input"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                className="input"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="input"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        <div className="card" style={{ gridColumn: '1 / -1' }}>
          <h2>System Settings</h2>
          <form onSubmit={handleSettingsSubmit}>
            <div className="settings-form-grid">
              <div className="form-group">
                <label>Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  className="input"
                  value={settings.siteName}
                  onChange={handleSettingsChange}
                />
              </div>
              <div className="form-group">
                <label>Site Email</label>
                <input
                  type="email"
                  name="siteEmail"
                  className="input"
                  value={settings.siteEmail}
                  onChange={handleSettingsChange}
                />
              </div>
              <div className="form-group">
                <label>Max Login Attempts</label>
                <input
                  type="number"
                  name="maxLoginAttempts"
                  className="input"
                  value={settings.maxLoginAttempts}
                  onChange={handleSettingsChange}
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Session Timeout (seconds)</label>
                <input
                  type="number"
                  name="sessionTimeout"
                  className="input"
                  value={settings.sessionTimeout}
                  onChange={handleSettingsChange}
                  min="60"
                />
              </div>
              <div className="form-group">
                <label>Theme</label>
                <select
                  name="theme"
                  className="input"
                  value={settings.theme}
                  onChange={handleSettingsChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleSettingsChange}
                  />
                  Maintenance Mode
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings

