const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const favoriteSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  title: { type: String, required: true },
  posterPath: { type: String, default: '' },
  genre: { type: String, default: '' }, // Added for filtering
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' }, // Cloudinary/Firebase URL
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role support
  favorites: [favoriteSchema],
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
