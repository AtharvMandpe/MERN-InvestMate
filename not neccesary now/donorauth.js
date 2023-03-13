const jwt = require('jsonwebtoken');
const express = require('express');
// const ngo_register = require("../models/ngo_register");
const donor_register = require("../models/donor_register");

const app = express();

const donorauth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const donoruser = await donor_register.findOne({ _id: verifyUser._id });
        // const ngouser = await ngo_register.findOne({ _id: verifyUser._id });
        console.log(donoruser.firstname);
        // console.log(ngouser.firstname);

        next();

    } catch (error) {
        res.status(401).send(error);
    }
}

// const ngoauth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(verifyUser);

//         // const donoruser = await donor_register.findOne({ _id: verifyUser._id });
//         const ngouser = await ngo_register.findOne({ _id: verifyUser._id })
//         // console.log(donoruser.firstname);
//         console.log(ngouser.firstname);

//         next();

//     } catch (error) {
//         res.status(401).send(error);
//     }
// }

module.exports = donorauth;