const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  input: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReviewQuestion', ReviewSchema);
