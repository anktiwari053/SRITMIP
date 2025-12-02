const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  email: {
    type: String,
    required: true
  },
  success: {
    type: Boolean,
    required: true
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  failureReason: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LoginLog', loginLogSchema);

