const mongoose = require('mongoose');

// Create schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'Number',
        required: true,
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true
    }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;