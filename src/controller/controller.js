const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const Zero_donation = require("../models/donation");

// create and save new user
exports.create = async (req, res) => {
    try {
        const email = req.body.email 
        const donation = new Zero_donation({
            email: email,
            description: req.body.Food_Description,
            quantity: req.body.Food_quantity,
            Date: req.body.date,
            Expiry_Date: req.body.expiry_date,
        });

        const result = await donation.save();
        console.log(result);
        res.redirect('/restaurantdash/' + email);
   
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
}


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

// Update a new idetified user by user id
exports.update = (req, res) => {
    const id = req.params.id;
    const update = req.body;
    console.log(id);
    console.log(update);
    const options = { useFindAndModify: false, new: true };
    
    if (!id) {
        return res.status(400).send({ message: 'Missing ID parameter' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid ID parameter' });
    }

    if (Object.keys(update).length === 0) {
        return res.status(400).send({ message: 'Missing update data' });
    }

    Zero_donation.findByIdAndUpdate(id, update, options)
        .then(data => {
            if (!data) {
                return res.status(404).send({ message: `Could not find user with ID ${id}` });
            }
            res.send(data);
            console.log(`User with ID ${id} updated successfully`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: 'Error updating user' });
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

// Display donations of users
exports.findByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const donations = await Zero_donation.find({ email: email });

        res.render('restaurantdash', { item: donations });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}