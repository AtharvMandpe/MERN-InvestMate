const express = require('express');
const route = express.Router()
const path = require('path');


const Zero_auth = require("../middleware/Zero_auth");
const services = require('../services/render');
const controller = require('../controller/controller');

const static_path = path.join(__dirname, "./public");
route.use(express.static(static_path));



/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);
route.get('/Zero_index', services.homeRoutes);

/**
 *  @description mission
 *  @method GET /mission
 */
route.get('/mission', services.mission);

route.get('/Zero_registeration', services.Zero_registeration);

route.get('/contact', services.contact);

route.get("/login", services.login);

route.get('/foodDonation', Zero_auth, services.foodDonation)

// route.get('/update_foodDonation', Zero_auth, services.update_foodDonation)
route.get('/update_foodDonation', Zero_auth, services.update_foodDonation)

route.get("/foodAfter", Zero_auth, services.foodAfter);

// route.get("/viewDonation", Zero_auth, services.viewDonation);

route.get("/donorPage", Zero_auth, services.donorPage);

route.get('/restaurantdash', Zero_auth, services.restaurantdash)


// API
route.post('/foodDonation', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);
route.get('/restaurantdash/:email', controller.findByEmail);



module.exports = route;