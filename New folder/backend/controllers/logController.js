const ActivityLog = require('../models/ActivityLog');
const LoginLog = require('../models/LoginLog');

// @desc    Get activity logs
// @route   GET /api/logs/activity
// @access  Private
exports.getActivityLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logs = await ActivityLog.find()
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ActivityLog.countDocuments();

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get login logs
// @route   GET /api/logs/login
// @access  Private
exports.getLoginLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const logs = await LoginLog.find()
      .populate('adminId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await LoginLog.countDocuments();

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/logs/analytics
// @access  Private
exports.getAnalytics = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Activity logs by day
    const activityLogs = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Login logs by day
    const loginLogs = await LoginLog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          successful: {
            $sum: { $cond: ['$success', 1, 0] }
          },
          failed: {
            $sum: { $cond: ['$success', 0, 1] }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Activity by resource type
    const activityByResource = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$resource',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        activityLogs,
        loginLogs,
        activityByResource
      }
    });
  } catch (error) {
    next(error);
  }
};

