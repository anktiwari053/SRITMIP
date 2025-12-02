// Profile page component displaying all user data
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getProfile, updateProfile } from '../services/profileService';
import './Profile.css';

/**
 * Profile Page Component
 * Displays user profile with all data: name, email, notes, chat history, and timer data
 */
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Load profile data on component mount
  useEffect(() => {
    loadProfile();
  }, []);

  // Load profile data
  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        name: data.user.name,
        email: data.user.email,
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      await updateProfile(formData.name, formData.email);
      await loadProfile(); // Reload profile data
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  // Format duration
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
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
        <div className="profile-header">
          <h1>👤 Profile</h1>
        </div>



          {/* Statistics Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{profile.notes.length}</div>
            <div className="stat-label">Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-value">{profile.chats.length}</div>
            <div className="stat-label">Chat Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{profile.timers.length}</div>
            <div className="stat-label">Timer Sessions</div>
          </div>
        </div>

       


        {/* User Information Section */}
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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" onClick={() => {
                  setEditing(false);
                  setFormData({
                    name: profile.user.name,
                    email: profile.user.email,
                  });
                }} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{profile.user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{profile.user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">
                  {new Date(profile.user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{profile.notes.length}</div>
            <div className="stat-label">Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-value">{profile.chats.length}</div>
            <div className="stat-label">Chat Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{profile.timers.length}</div>
            <div className="stat-label">Timer Sessions</div>
          </div>
        </div>

        {/* Notes Summary */}
        {profile.notes.length > 0 && (
          <div className="profile-section">
            <h2>Recent Notes ({profile.notes.length})</h2>
            <div className="notes-list">
              {profile.notes.slice(0, 5).map((note) => (
                <div key={note._id} className="note-summary">
                  <h3>{note.title}</h3>
                  <p>{note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}</p>
                  <span className="note-date">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timer History */}
        {profile.timers.length > 0 && (
          <div className="profile-section">
            <h2>Timer History ({profile.timers.length})</h2>
            <div className="timer-list">
              {profile.timers.map((timer, index) => (
                <div key={timer._id || index} className="timer-item">
                  <div className="timer-info">
                    <span className="timer-duration">{formatDuration(timer.duration)}</span>
                    <span className="timer-date">
                      {new Date(timer.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat History Summary */}
        {profile.chats.length > 0 && (
          <div className="profile-section">
            <h2>Chat History ({profile.chats.length} sessions)</h2>
            <div className="chats-list">
              {profile.chats.slice(0, 3).map((chat, index) => (
                <div key={chat._id || index} className="chat-summary">
                  <p className="chat-message-count">
                    {chat.messages.length} messages
                  </p>
                  <span className="chat-date">
                    Last updated: {new Date(chat.updatedAt).toLocaleString()}
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

