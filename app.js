const express = require('express');
const mongoose = require("mongoose")
const path = require('path');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLM = require('passport-local-mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require("./models/User");

const app = express();

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/loginDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session configuration

app.use(session({
    secret: 'your secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy configuration
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// Routes
app.get('/', (req, res) => {
    res.send('Wellcome to index Page Go to loing page http://localhost:3000/login');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));



// if you have a register page

/*
router.post("/register", function (req, res) {
    let userdata = new User({
        username: req.body.username,
        email: req.body.email,
    });

    User
        .register(userdata, req.body.password)
        .then(function (registereduser) {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        });
}); 
*/

app.listen(3000, () => {
    console.log("server is run");
})