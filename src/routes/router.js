const express = require('express');
const route = express.Router()

const Zero_auth = require("../middleware/Zero_auth");
const services = require('../services/render');
const controller = require('../controller/controller');


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

route.get('/update_foodDonation', Zero_auth, services.update_foodDonation)

route.get("/foodAfter", Zero_auth, services.foodAfter);

route.get("/donorPage", Zero_auth, services.donorPage);

// route.get('/viewDonation', services.viewDonation)


// API
route.post('/foodDonation', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route;