const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', true);

const DonationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Expiry_Date: {
        type: String,
        required: true
    },
    Checkbox: {
        type: String,
        default: "false"
    }
})

const donation = new mongoose.model('donation', DonationSchema);

module.exports = donation;