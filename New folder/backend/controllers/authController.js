const Admin = require('../models/Admin');
const LoginLog = require('../models/LoginLog');
const generateToken = require('../utils/generateToken');

// @desc    Register admin
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if admin exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists with this email'
      });
    }

    // Create admin
    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || 'admin'
    });

    // Log login attempt
    await LoginLog.create({
      adminId: admin._id,
      email: admin.email,
      success: true,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('user-agent')
    });

    const token = generateToken(admin._id);

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      await LoginLog.create({
        email,
        success: false,
        failureReason: 'Admin not found',
        ipAddress: req.ip || req.connection?.remoteAddress,
        userAgent: req.get('user-agent')
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      await LoginLog.create({
        email,
        success: false,
        failureReason: 'Invalid password',
        ipAddress: req.ip || req.connection?.remoteAddress,
        userAgent: req.get('user-agent')
      });

      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Log successful login
    await LoginLog.create({
      adminId: admin._id,
      email: admin.email,
      success: true,
      ipAddress: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('user-agent')
    });

    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.json({
      success: true,
      data: {
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    const admin = await Admin.findById(req.admin._id).select('+password');

    // Check current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

