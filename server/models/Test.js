const { Schema, model } = require('mongoose');

const Test = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: Array, required: true },
  owner: { type: String, required: true, ref: 'User' },
});

module.exports = model('Test', Test);
