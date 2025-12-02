const Settings = require('../models/Settings');
const logActivity = require('../utils/logActivity');

// @desc    Get settings
// @route   GET /api/settings
// @access  Private
exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.getSettings();
    res.json({
      success: true,
      data: { settings }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
        new: true,
        runValidators: true
      });
    }

    // Log activity
    await logActivity(req.admin._id, 'update', 'settings', settings._id.toString(), req.body, req);

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: { settings }
    });
  } catch (error) {
    next(error);
  }
};

