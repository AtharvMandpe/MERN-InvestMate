require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");

require("./db/conn");
const ngo_register = require("./models/ngo_register");
const donor_register = require("./models/donor_register");



const app = express();
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(process.env.SECRET_KEY);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/secret', auth, (req, res) => {
    // console.log(`The cookie generated is : ${req.cookies.jwt}`);
    res.render('index');
});

app.get('/mission', (req, res) => {
    res.render('mission');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/ngo_registration', (req, res) => {
    res.render('ngo_registration');
});

app.get('/donor_registration', (req, res) => {
    res.render('donor_registration');
});

app.get('/contact', (req,res) => {
    res.render('contact');
})

app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const useremail = await donor_register.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);

        const token = await useremail.generateAuthToken();
        console.log(`The token generated is : ${token}`);
        res.cookie('jwt', token, {
            expires : new Date(Date.now() + 30000),
            httpOnly : true
        });

        if (ismatch) {
            res.status(201).render('index');
        }
        else {
            res.render('failure');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/ngo_registration', async (req, res) => {
    try {
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const register = new ngo_register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                // gender : req.body.gender,
                phone: req.body.phone,
                address: req.body.address,
                password: password,
                confirmpassword: cpassword
            });

            const token = await register.generateAuthToken();
            console.log(token);
            res.cookie('jwt', token, {
                expires : new Date(Date.now() + 30000),
                httpOnly : true
            });

            const result = await register.save();
            console.log(result);
            res.status(201).render('index');
        } else {
            res.render('failure');
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/donor_registration', async (req, res) => {
    try {
        // console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            const register = new donor_register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                birthday: req.body.birthday,
                password: password,
                confirmpassword: cpassword
            });

            const token = await register.generateAuthToken();
            console.log(token);
            res.cookie('jwt', token, {
                expires : new Date(Date.now() + 30000),
                httpOnly : true
            });

            const result = await register.save();
            console.log(result);
            res.status(201).render('index');
        } else {
            res.render('failure');
        }
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});



app.post("/failure", function (req, res) {
    res.redirect('index');
})

app.listen(port, () => {
    console.log(`server is runnning on port ${port}`);
});

// const createToken = async(id) => {
//     const token = await jwt.sign({_id : id}, "sohamisagoodboyandmalharisabadboyandyouknowwhy", 
//     {expiresIn : "2 seconds"}
//     );
//     console.log(token);

//     const userver = jwt.verify(token, "sohamisagoodboyandmalharisabadboyandyouknowwhy"); 
//     console.log(userver);
// }
// createToken('63e3fa6d3765261def6282cf');