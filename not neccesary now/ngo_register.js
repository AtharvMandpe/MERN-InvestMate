const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
mongoose.set('strictQuery', true);

const NgoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generating token
NgoSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        // console.log(token);

        this.tokens = this.tokens.concat({token : token});
        await this.save();

        return token;

    } catch (error) {
        // res.send("The Error is : " + error);
        console.log(error);
    }
}

// converting password into hash
NgoSchema.pre('save', async function (next) {
    // const passwordHash = await bcrypt.hash(password, 10);
    if (this.isModified("password")) {
        
        this.password = await bcrypt.hash(this.password, 10);
        

        this.confirmpassword = await bcrypt.hash(this.password, 10);

    }

    next();
});

// create Collection

const ngo_register = new mongoose.model('ngo_register', NgoSchema);

module.exports = ngo_register;