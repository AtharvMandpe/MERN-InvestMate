const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', true);

const DonorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
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
DonorSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : token});
        await this.save();

        return token;

    } catch (error) {
        // res.send("The Error is : " + error);
        console.log(error);
    }
}

// password to hash 
DonorSchema.pre('save', async function (next) {
    // const passwordHash = await bcrypt.hash(password, 10);
    if (this.isModified("password")) {
       
        this.password = await bcrypt.hash(this.password, 10);
       

        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }

    next();
});

// create Collection

const donor_register = new mongoose.model('Donor_register', DonorSchema);

module.exports = donor_register;