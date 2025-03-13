const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  phone_number: {type: Number, required:true, unique:true}
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

