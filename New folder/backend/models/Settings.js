const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    default: 'Admin Panel'
  },
  siteEmail: {
    type: String,
    default: 'admin@example.com'
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maxLoginAttempts: {
    type: Number,
    default: 5
  },
  sessionTimeout: {
    type: Number,
    default: 3600
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'light'
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('Settings', settingsSchema);

