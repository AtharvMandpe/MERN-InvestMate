const { create } = require('hbs');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', true);

const DonationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    // schedule: [{
    //     hours: {
    //         type: Number, required: true, min: 0, max: 23
    //     },
    //     minutes: {
    //         type: Number, required: true, min: 0, max: 59
    //     },
    //     seconds: {
    //         type: Number, required: true, min: 0, max: 59
    //     }
    // }],
    Expiry_Date: {
        type: String,
        required: true
    }
})

// generating token
// DonationSchema.methods.generateAuthToken = async function () {
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
// DonationSchema.pre('save', async function (next) {
//     // const passwordHash = await bcrypt.hash(password, 10);
//     if (this.isModified("password")) {
       
//         this.password = await bcrypt.hash(this.password, 10);
       

//         this.confirmpassword = await bcrypt.hash(this.password, 10);
//     }

//     next();
// });

// create Collection

const donation = new mongoose.model('donation', DonationSchema);

module.exports = donation;