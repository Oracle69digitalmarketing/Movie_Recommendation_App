const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  favorites: [Object]
});

module.exports = mongoose.model('User', userSchema);
