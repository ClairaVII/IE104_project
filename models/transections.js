const mongoose = require('mongoose');

const TransectionSchema = new mongoose.Schema({
    id_renter: {
        type: String,
        required: true,
    },
    id_rented_person: {
        type: String,
        required: true,
    },
    id_service: {
        type: String,
        required: true,
    },
    rental_data: {
        type: Date,
        default: Date.now,
    },
    number_match: {
        type: Number,
    },
    price: {
        type: Number,
    },
  });

const transection = mongoose.model('transections', TransectionSchema);

module.exports = transection;