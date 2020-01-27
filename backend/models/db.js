const mongoose = require('mongoose');

const login = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('login', login);