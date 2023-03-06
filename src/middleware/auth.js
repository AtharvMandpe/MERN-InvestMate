const jwt = require('jsonwebtoken');
const express = require('express');
const ngo_register = require("../models/ngo_register");
const donor_register = require("../models/donor_register");

const app = express();

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = await donor_register.findOne({ _id: verifyUser._id })
        console.log(user.firstname);

        next();

    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;