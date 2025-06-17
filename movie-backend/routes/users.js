const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { Parser } = require('json2csv');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');
const isAdmin = require('../middleware/isAdmin');
const uploadAvatar = require('../utils/uploadHandler');

// ─────────────────────────────────────────────
// MULTER CONFIG FOR IMAGE UPLOAD
// ─────────────────────────────────────────────
const upload = multer({ dest: 'uploads/' });

router.post('/upload-avatar', authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', req.file.path);
    const platform = req.query.platform || 'cloudinary';
    const avatarUrl = await uploadAvatar(filePath, platform);

    await User.findByIdAndUpdate(req.user.id, { avatarUrl });
    fs.unlinkSync(filePath);

    res.json({ message: 'Avatar updated', avatarUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

// ─────────────────────────────────────────────
// USER ROUTES
// ─────────────────────────────────────────────

router.put('/settings', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

  try {
    const existingEmailUser = await User.findOne({ email, _id: { $ne: userId } });
    if (existingEmailUser) return res.status(409).json({ message: 'Email already in use' });

    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({ message: 'Old and new passwords are required' });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/favorite', authenticateToken, async (req, res) => {
  const { movieId, title, posterPath } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.favorites.push({ movieId, title, posterPath });
    await user.save();

    res.json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to favorite' });
  }
});

router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch favorites' });
  }
});

// ─────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────

router.get('/admin/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
});

router.get('/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
});

router.patch('/admin/users/:id/role', authenticateToken, isAdmin, async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true, select: '-password' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: `User role updated to ${role}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

router.delete('/admin/users/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

router.get('/admin/users/:id/logs', authenticateToken, isAdmin, async (req, res) => {
  res.json({ message: 'User logs feature not implemented yet' });
});

router.get('/admin/export-users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password -favorites -__v');
    const parser = new Parser();
    const csv = parser.parse(users);
    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Export failed' });
  }
});

router.get('/admin/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: 'admin' });
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name email role createdAt');

    res.json({ totalUsers, admins, recentUsers });
  } catch (err) {
    res.status(500).json({ message: 'Stats fetch failed' });
  }
});

module.exports = router;
