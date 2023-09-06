const { Schema, model } = require('mongoose');

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  completedTests: [{ type: Array, ref: 'Test' }],
  ownTests: [{ type: Array, ref: 'Test' }],
});

module.exports = model('User', User);
