const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const cors = require('cors');
const myRouter = require('./routes/index');


app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  
  passport.use(new LinkedInStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACKURL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
  ));
  

app.use('/', myRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port : ${port} `)
});
