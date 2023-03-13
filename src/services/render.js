const axios = require('axios');

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