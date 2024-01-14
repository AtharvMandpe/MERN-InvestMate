const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
mongoose.set('strictQuery', true);

const ContactSchema = new mongoose.Schema({
    Fullname: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Message: {
        type: String,
        required: true,
        // unique: true
    }
})

const Contact_register = new mongoose.model('contact', ContactSchema);

module.exports = Contact_register;