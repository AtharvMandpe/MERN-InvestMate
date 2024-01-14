const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Zero_donation = require("../models/product");


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res) => {
    if(req.query.id){
        const id = req.query.id;

        Zero_donation.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        Zero_donation.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}


exports.update = (req, res) => {
    const id = req.params.id;
    const data = req.body;
  
    Zero_donation.findByIdAndUpdate(id, data, { new: true }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(user);
      }
    });
  };




// Delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Zero_donation.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

// Find donation by ID
exports.findById = async (req, res) => {
    try {
        const id = req.params.id;
        const donation = await Zero_donation.findById(id);

        if (!donation) {
            // Handle the case where the donation with the provided ID was not found
            return res.status(404).send("Donation not found");
        }

        res.render('product_detail', { product: donation });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.findByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const donations = await Zero_donation.find({ email: email });

        res.render('seller_dash', { item: donations });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
