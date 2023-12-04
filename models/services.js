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
    img: {
        type: String,
    }
  });

const service = mongoose.model('services', ServiceSchema);

module.exports = service;