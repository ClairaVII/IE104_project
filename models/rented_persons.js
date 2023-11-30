const { Double } = require('mongodb');
const mongoose = require('mongoose');

const rented_personSchema = new mongoose.Schema({
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
        type: Number,
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
    evaluate: {
        type: Number,
        default: -1,
    },
    number_of_rentals: {
        type: Number,
        default: 0,
    },
    service: {
        type: Array,
        default: [],
    },
    password: {
        type: String,
    },
    avatar: {
        type: String,
    },
  });

const rented_person = mongoose.model('rented_persons', rented_personSchema);

module.exports = rented_person;