const User = require('../models/User');

// Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  const token = user.generateJWT();
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = user.generateJWT();
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Get user profile
exports.getProfile = async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  res.json({ message: 'Profile updated' });
};
