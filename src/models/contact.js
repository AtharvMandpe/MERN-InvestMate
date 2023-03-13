const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
mongoose.set('strictQuery', true);

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
        required: true,
        // unique: true
    }
})

// generating token
// DonorSchema.methods.generateAuthToken = async function () {
//     try {
//         const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
//         this.tokens = this.tokens.concat({token : token});
//         await this.save();

//         return token;

//     } catch (error) {
//         // res.send("The Error is : " + error);
//         console.log(error);
//     }
// }

// // password to hash 
// DonorSchema.pre('save', async function (next) {
//     // const passwordHash = await bcrypt.hash(password, 10);
//     if (this.isModified("password")) {
       
//         this.password = await bcrypt.hash(this.password, 10);
       

//         this.confirmpassword = await bcrypt.hash(this.password, 10);
//     }

//     next();
// });

// create Collection

const Contact_register = new mongoose.model('contact', ContactSchema);

module.exports = Contact_register;