const axios = require('axios');
const Zero_donation = require("../models/donation");


exports.homeRoutes = (req, res) => {
    res.render('Zero_index');
}

exports.foodDonation = (req, res) => {
    res.render('foodDonation');
}

exports.update_foodDonation = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_foodDonation", { item : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    // res.render('update_foodDonation');
}

// exports.update_foodDonation = (req, res, next) => {
//     console.log(req.params.id);
//     Zero_donation.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, docs) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("update_foodDonation", { item : docs.data});

//         }
//     });
//     // res.render('update_foodDonation');
// }

exports.mission = (req, res) => {
    res.render('mission');
}

exports.login = (req, res) => {
    res.render('login');
}

exports.contact = (req, res) => {
    res.render('contact');
}

exports.Zero_registeration = (req, res) => {
    res.render('Zero_registeration');
}

exports.donorPage = (req, res) => {
    res.render('donorPage');
}

// exports.restaurantdash = (req, res) => {
//     res.render('restaurantdash');
// }

// exports.viewDonation = (req, res) => {
//     // Make a get request to /api/users
//    axios.get('http://localhost:3000/api/users')
//    .then(function (response) {
//        console.log(response.data);
//        res.render('viewDonation', { item: response.data });
//    })
//    .catch(err => {
//        res.send(err);
//    })
//     // res.render('viewDonation');
// }

exports.foodAfter = (req, res) => {
   // Make a get request to /api/users
   axios.get('http://localhost:3000/api/users')
   .then(function (response) {
       console.log(response.data);
       res.render('foodAfter', { item: response.data });
   })
   .catch(err => {
       res.send(err);
   })
}

exports.restaurantdash = (req, res) => {
    axios.get('http://localhost:3000/restaurantdash', { params : { id : req.query.email }})
        .then(function(userdata){
            res.render("restaurantdash", { item : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    // res.render('update_foodDonation');
}
