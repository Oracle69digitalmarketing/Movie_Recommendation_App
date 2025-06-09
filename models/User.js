const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: Object }],
  watchlist: [{ type: Object }]
});

module.exports = mongoose.model('User', UserSchema);
