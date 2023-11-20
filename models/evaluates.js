const mongoose = require('mongoose');

const EvaluateSchema = new mongoose.Schema({
    id_transection: {
        type: String,
        required: true,
        unique: true,
    },
    evaluate: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
  });

const Renter = mongoose.model('evaluates', EvaluateSchema);

module.exports = evaluate;