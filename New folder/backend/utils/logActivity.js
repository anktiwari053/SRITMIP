const ActivityLog = require('../models/ActivityLog');

const logActivity = async (adminId, action, resource, resourceId = null, details = null, req = null) => {
  try {
    await ActivityLog.create({
      adminId,
      action,
      resource,
      resourceId,
      details,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('user-agent')
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

module.exports = logActivity;

