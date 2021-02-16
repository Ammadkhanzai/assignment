const passport = require('passport');
const express = require('express');
var router = express.Router();

// Linkedin Routes
router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

// App Routes
  router.get('/', isLoggedOut ,function (req, res) {
    res.render('pages/index'); 
  });
  
  router.get('/home', isLoggedIn ,function (req, res) {
    res.render('pages/home'); 
  });

  router.get('/location', isLoggedIn ,function (req, res) {
    res.render('pages/location'); 
  });

  router.get('/weather', isLoggedIn ,function (req, res) {
    res.render('pages/weather'); 
  });
  
  
  router.get('/profile', isLoggedIn, function (req, res) {
   res.render('pages/profile.ejs', { user: req.user});
    //res.send(req.user);
  });
  
  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
  
  //Middlewares
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated())
      return next();
    res.redirect('/profile');
  }



module.exports = router;
