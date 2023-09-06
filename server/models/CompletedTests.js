const { Schema, model } = require('mongoose');

const CompletedTests = new Schema({
  testId: { type: String, required: true, ref: 'Test' },
  ownerId: { type: String, required: true, ref: 'User' },
  userId: { type: String, required: true, ref: 'User' },
  results: { type: Array, required: true },
});

module.exports = model('completed-tests', CompletedTests);
