const Zero_donation = require("../models/donation");

// create and save new user
exports.create = async (req, res) => {
    try {
        const donation = new Zero_donation({
            email: req.body.email,
            description: req.body.Food_Description,
            quantity: req.body.Food_quantity,
            Date: req.body.date,
            Expiry_Date: req.body.expiry_date,
        });

        // const token = await register.generateAuthToken();
        // console.log(token);
        // res.cookie('jwt', token, {
        //     expires: new Date(Date.now() + 200000),
        //     httpOnly: true
        // });

        const result = await donation.save();
        console.log(result);
        res.status(201).render('donorPage');
   
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
                res.status(500).send({ message: "Erro retrieving user with id " + id})
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
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Zero_donation.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

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