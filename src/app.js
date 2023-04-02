require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const axios = require('axios');



const Zero_auth = require("./middleware/Zero_auth");

require("./db/conn");
const Zero_register = require("./models/register");
const Zero_donation = require("./models/donation");
const Contact_register = require('./models/contact');

const app = express();
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
// const template_path = path.join(__dirname, "../templates/views");
// const partials_path = path.join(__dirname, "../templates/partials");
// console.log(process.env.SECRET_KEY);


// log requests
app.use(morgan('tiny'));

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(static_path));
// app.set("views", template_path);
// hbs.registerPartials(partials_path);

// load routers
app.use('/', require('./routes/router'));

// app.get("/Zero_regiteration", (req, res) => {
//     res.render('Zero_regiteration');
// })

// app.get("/viewDonation",  (req, res) => {
//     res.render('viewDonation');
// })





app.post("/login", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const role = req.body.role;
        console.log(role);
        if ('Donor' === role || 'Restaurant' === role) {
            const useremail = await Zero_register.findOne({ email: email });
            const ismatch = await bcrypt.compare(password, useremail.password);
            console.log(useremail);
            const token = await useremail.generateAuthToken();
            console.log(`The token generated is : ${token}`);
            res.cookie('token', token, {
                expires: new Date(Date.now() + 30000),
                httpOnly: true
            });
            if (ismatch) {
                res.status(201).redirect('/restaurantdash/' + useremail.email);
            }
            else {
                res.render('failure');
            }
        } else {
            const useremail = await Zero_register.findOne({ email: email });
            const ismatch = await bcrypt.compare(password, useremail.password);
            console.log(useremail);
            const token = await useremail.generateAuthToken();
            console.log(`The token generated is : ${token}`);
            res.cookie('token', token, {
                expires: new Date(Date.now() + 20000000),
                httpOnly: true
            });
            if (ismatch) {
                // userDeatils.exec(function(error, data){
                //     if (error) {
                //         console.log(error);
                //     }
                //     res.render('foodAfter', {record : data});
                // });
                res.status(201).redirect('foodAfter');
            }
            else {
                res.render('failure');
            }
        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

app.get('/logout', Zero_auth, async (req, res) =>{
    try {
        console.log(req.user);

        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token !== req.token;
        });

        res.clearCookie('token');

        console.log('logout successful');

        await req.user.save();
        res.status(201).redirect('/login');
    } catch (error) {
        
    }
})

// const userDeatils = Zero_donation.find({}); 



// app.post('/foodDonation', async (req, res) => {
//     try {
//             const donation = new Zero_donation({
//                 email: req.body.email,
//                 description: req.body.Food_Description,
//                 quantity: req.body.Food_quantity,
//                 Date: req.body.date,
//                 Expiry_Date: req.body.expiry_date,
//             });

//             // const token = await register.generateAuthToken();
//             // console.log(token);
//             // res.cookie('jwt', token, {
//             //     expires: new Date(Date.now() + 20000000),
//             //     httpOnly: true
//             // });

//             const result = await donation.save();
//             console.log(result);
//             res.status(201).render('Zero_index');
       
//     } catch (error) {
//         res.status(400).send(error);
//         console.log(error);
//     }
// });

app.post('/Zero_registeration', async (req, res) => {
    try {
        console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const role = req.body.role;

        if (password === cpassword) {
            const register = new Zero_register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                middlename: req.body.middlename,
                state: req.body.state,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                password: password,
                confirmpassword: cpassword,
                role: role
            });

            const token = await register.generateAuthToken();
            console.log(token);
            res.cookie('token', token, {
                expires: new Date(Date.now() + 20000000),
                httpOnly: true
            });

            const result = await register.save();
            console.log(result);

            if (role === 'Donor' || role === 'Restaurant') {
                res.status(201).redirect('/donorPage');
               } else {
                res.status(201).redirect('/foodAfter');
               }
            
        } else {
            res.render('failure');
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

app.post('/contact', async (req, res) => {
    try {
        console.log(req.body.firstname);

            const contact = new Contact_register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                state: req.body.state,
                email: req.body.email,
                subject: req.body.subject,
            });

            // const token = await register.generateAuthToken();
            // console.log(token);
            // res.cookie('jwt', token, {
            //     expires: new Date(Date.now() + 20000000),
            //     httpOnly: true
            // });

            const result = await contact.save();
            console.log(result);
            res.status(201).render('Zero_index');
       
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

// app.get("/foodAfter", Zero_auth, (req, res) => {
//     // res.render('login');
//     userDeatils.exec(function(error, data){
//         if (error) {
//             console.log(error);
//         }
//         res.render('foodAfter', {item : data});
//     });
//     // Zero_donation.find().then(donation_data => {
//     //     Zero_register.find().then(register_data => {
//     //         res.render('foodAfter', {record : donation_data, element : register_data});
//     //     }).catch(err => console.log(err))
//     // }).catch(err => console.log(err))
// });



app.post("/failure", function (req, res) {
    res.redirect('login');
})

app.listen(port, ()=> { 
    console.log(`Server is running on http://localhost:${port}`)
});
