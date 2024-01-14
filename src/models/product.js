const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', true);

const ProductSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    // Checkbox: {
    //     type: String,
    //     default: "false"
    // }
})

const Product = new mongoose.model('product', ProductSchema);

module.exports = Product;