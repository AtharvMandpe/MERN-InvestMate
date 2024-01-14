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
const multer = require('multer');
const format = require('date-fns/format');


const auth = require("./middleware/auth");

require("./db/conn");
const Zero_register = require("./models/register");
const Zero_donation = require("./models/product");
const Contact_register = require('./models/contact');

const app = express();
const port = process.env.PORT || 8000;
const static_path = path.join(__dirname, "../public");

app.use(morgan('tiny'));

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(static_path));

app.use('/', require('./routes/router'));

let storage = multer.diskStorage({
    destination: 'public/backend_images/',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({
    storage: storage,
})

app.get('/update_checkbox', function (req, res) {
    var id = req.query.id;
    var value = req.query.value;
    Zero_donation.findByIdAndUpdate(id, { $set: { Checkbox: value } }, { new: true })
        .then(updatedDonation => res.json(updatedDonation))
        .catch(error => console.log(error));
});

app.get('/seller_dash', (req, res) => {
    res.render('seller_dash');
})

app.post("/login", async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const role = req.body.role;
        console.log(role);
        if ('Seller' === role) {
            const useremail = await Zero_register.findOne({ email: email });
            const ismatch = await bcrypt.compare(password, useremail.password);
            console.log(useremail);
            const token = await useremail.generateAuthToken();
            console.log(`The token generated is : ${token}`);
            res.cookie('token', token, {
                expires: new Date(Date.now() + 2000000),
                httpOnly: true
            });
            if (ismatch) {
                res.status(201).redirect('/seller_dash/' + useremail.email);
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
                expires: new Date(Date.now() + 2000000),
                httpOnly: true
            });
            if (ismatch) {
                res.status(201).redirect('/product_show');
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

app.get('/logout', auth, async (req, res) => {
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
        console.log(error);
    }
})

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const Title = req.body.title;
        const email = req.body.email
        const inputDate = req.body.date; // Assuming you are using the "date" field in the form

        // Convert the input date to a JavaScript Date object
        const dateObject = new Date(inputDate);

        // Format the date using date-fns
        const formattedDate = format(dateObject, 'MMMM dd, yyyy', { awareOfUnicodeTokens: true });
        const add_new_product = new Zero_donation({
            Email: email,
            Title: Title,
            Description: req.body.description,
            Price: req.body.price,
            Date: formattedDate,
            Image: req.file.filename,
        });
        const result = await add_new_product.save();
        console.log(result);
        res.status(201).redirect('/seller_dash/' + email);

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

app.post('/mate_register', async (req, res) => {
    try {
        console.log(req.body.firstname);
        // res.send(req.body.firstname);
        const password = req.body.password;
        const cpassword = req.body.confirmPassword;
        const role = req.body.role;
        const email = req.body.email;

        if (password === cpassword) {
            const register = new Zero_register({
                fullname: req.body.fullname,
                // state: req.body.state,
                phone: req.body.phoneNumber,
                email: email,
                // address: req.body.address,
                password: password,
                confirmpassword: cpassword,
                role: role
            });

            const token = await register.generateAuthToken();
            console.log(token);
            res.cookie('token', token, {
                expires: new Date(Date.now() + 2000000),
                httpOnly: true
            });

            const result = await register.save();
            console.log(result);

            if (role === 'Seller') {
                res.status(201).redirect('/seller_dash/' + email);
            } else {
                res.status(201).redirect('/product_show');
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
            Fullname: req.body.fullname,
            Message: req.body.message,
            Email: req.body.email,
            Subject: req.body.subject,
        });

        const result = await contact.save();
        console.log(result);
        res.status(201).render('home_page');

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});


app.post("/failure", function (req, res) {
    res.redirect('login');
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});
