const axios = require('axios');
const Zero_donation = require("../models/product");


exports.homeRoutes = (req, res) => {
    res.render('home_page');
}

exports.add_new_product = (req, res) => {
    res.render('add_new_product');
}

exports.mission = (req, res) => {
    res.render('mission');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.contact = (req, res) => {
    res.render('mate_contact');
}

exports.mate_register = (req, res) => {
    res.render('mate_register');
}

exports.add_to_cart = (req, res) => {
    res.render('add_to_cart');
}

exports.show_product = (req, res) => {
   // Make a get request to /api/users
   axios.get('http://localhost:8000/api/users')
   .then(function (response) {
       console.log(response.data);
       res.render('product_show', { products: response.data });
   })
   .catch(err => {
       res.send(err);
   })
}
