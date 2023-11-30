const mongoose = require('mongoose');

const RenterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    joining_date: {
        type: Date,
        default: Date.now,
    },
    money: {
        type: Number,
        default: 0,
    },
    rented_object: {
        type: Array,
        default: null,
    },
  });

const renter = mongoose.model('renters', RenterSchema);

module.exports = renter;