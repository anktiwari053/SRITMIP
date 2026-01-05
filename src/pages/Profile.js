// Profile page component displaying all user data safely
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getProfile, updateProfile } from '../services/profileService';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Load profile data on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        name: data?.user?.name || '',
        email: data?.user?.email || '',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData.name, formData.email);
      await loadProfile(); // Reload profile
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  if (loading) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-container">
        <Navbar />
        <div className="error">Error loading profile. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <h1>👤 Profile</h1>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{profile?.notes?.length || 0}</div>
            <div className="stat-label">Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-value">{profile?.chats?.length || 0}</div>
            <div className="stat-label">Chat Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{profile?.timers?.length || 0}</div>
            <div className="stat-label">Timer Sessions</div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            {!editing && (
              <button onClick={() => setEditing(true)} className="edit-btn">
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setEditing(false);
                    setFormData({
                      name: profile?.user?.name || '',
                      email: profile?.user?.email || '',
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{profile?.user?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile?.user?.email || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">
                  {profile?.user?.createdAt
                    ? new Date(profile.user.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Recent Notes */}
        {profile?.notes?.length > 0 && (
          <div className="profile-section">
            <h2>Recent Notes ({profile.notes.length})</h2>
            <div className="notes-list">
              {profile.notes.slice(0, 5).map((note) => (
                <div key={note._id || note.title} className="note-summary">
                  <h3>{note.title || 'Untitled'}</h3>
                  <p>
                    {(note.content || '').substring(0, 100)}
                    {(note.content && note.content.length > 100) ? '...' : ''}
                  </p>
                  <span className="note-date">
                    {note.updatedAt
                      ? new Date(note.updatedAt).toLocaleDateString()
                      : 'No Date'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timer History */}
        {profile?.timers?.length > 0 && (
          <div className="profile-section">
            <h2>Timer History ({profile.timers.length})</h2>
            <div className="timer-list">
              {profile.timers.map((timer, index) => (
                <div key={timer._id || index} className="timer-item">
                  <div className="timer-info">
                    <span className="timer-duration">
                      {formatDuration(timer.duration || 0)}
                    </span>
                    <span className="timer-date">
                      {timer.createdAt
                        ? new Date(timer.createdAt).toLocaleString()
                        : 'No Date'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat History */}
        {profile?.chats?.length > 0 && (
          <div className="profile-section">
            <h2>Chat History ({profile.chats.length} sessions)</h2>
            <div className="chats-list">
              {profile.chats.slice(0, 3).map((chat, index) => (
                <div key={chat._id || index} className="chat-summary">
                  <p className="chat-message-count">
                    {chat?.messages?.length || 0} messages
                  </p>
                  <span className="chat-date">
                    Last updated:{' '}
                    {chat?.updatedAt
                      ? new Date(chat.updatedAt).toLocaleString()
                      : 'No Date'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
