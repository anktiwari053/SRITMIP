import { useState, useEffect } from 'react'
import api from '../utils/api'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'
import './Users.css'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 })
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', status: 'active' })

  useEffect(() => {
    fetchUsers()
  }, [page, search, statusFilter])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = { page, limit: 10 }
      if (search) params.search = search
      if (statusFilter) params.status = statusFilter

      const response = await api.get('/users', { params })
      setUsers(response.data.data.users)
      setPagination(response.data.data.pagination)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        status: user.status
      })
    } else {
      setEditingUser(null)
      setFormData({ name: '', email: '', phone: '', status: 'active' })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingUser(null)
    setFormData({ name: '', email: '', phone: '', status: 'active' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser._id}`, formData)
      } else {
        await api.post('/users', formData)
      }
      closeModal()
      fetchUsers()
    } catch (error) {
      alert(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    
    try {
      await api.delete(`/users/${id}`)
      fetchUsers()
    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed')
    }
  }

  const getStatusBadge = (status) => {
    const colors = {
      active: 'var(--success-color)',
      inactive: 'var(--warning-color)',
      suspended: 'var(--danger-color)'
    }
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: `${colors[status]}20`, color: colors[status] }}
      >
        {status}
      </span>
    )
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <h1>Users</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <FiPlus />
          Add User
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearch}
            className="input"
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={handleStatusFilter}
          className="input"
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || '-'}</td>
                      <td>{getStatusBadge(user.status)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="icon-btn-edit"
                            onClick={() => openModal(user)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            className="icon-btn-delete"
                            onClick={() => handleDelete(user._id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {pagination.pages > 1 && (
            <div className="pagination">
              <button 
                className="btn btn-secondary"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {pagination.page} of {pagination.pages}
              </span>
              <button 
                className="btn btn-secondary"
                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Users

