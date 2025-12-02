import { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token')
  })

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchAdmin()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchAdmin = async () => {
    try {
      const response = await api.get('/auth/me')
      setAdmin(response.data.data.admin)
    } catch (error) {
      console.error('Failed to fetch admin:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: newToken, admin: adminData } = response.data.data
      setToken(newToken)
      setAdmin(adminData)
      localStorage.setItem('token', newToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password })
      const { token: newToken, admin: adminData } = response.data.data
      setToken(newToken)
      setAdmin(adminData)
      localStorage.setItem('token', newToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      }
    }
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

