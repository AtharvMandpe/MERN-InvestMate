const express = require('express');
const route = express.Router()
const path = require('path');


const Zero_auth = require("../middleware/auth");
const services = require('../services/render');
const controller = require('../controller/controller');

const static_path = path.join(__dirname, "./public");
route.use(express.static(static_path));



/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
route.get('/home_page', services.homeRoutes);

/**
 *  @description mission
 *  @method GET /mission
 */

route.get('/mate_register', services.mate_register);

route.get('/mate_contact', services.contact);

route.get("/login", services.login);

route.get('/add_new_product', Zero_auth, services.add_new_product)

route.get("/product_show", Zero_auth,  services.show_product);

route.get("/add_to_cart", Zero_auth, services.add_to_cart);

// API
// route.post('/upload', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
route.get('/product_detail/:id', Zero_auth, controller.findById);
route.get('/seller_dash/:email', Zero_auth, controller.findByEmail);



module.exports = route;