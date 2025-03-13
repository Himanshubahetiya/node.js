const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone_number: {type: Number, require: true, unique: true}
},
{ timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);