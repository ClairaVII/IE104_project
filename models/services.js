const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
  });

const Renter = mongoose.model('services', ServiceSchema);

module.exports = service;