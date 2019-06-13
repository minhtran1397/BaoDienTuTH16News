var express = require('express');
var userModel = require('../models/user.model');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('Req 3 - Writer/Register');
  })

router.get('/is-available', (req, res, next) => {
  var user = req.query.username;
  userModel.singleByUserName(user).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    }

    return res.json(true);
  })
})

router.post('/add', (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

  var entity = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email,
    dob: dob,
    role: req.body.role
  }

  userModel.add(entity).then(id => {
    res.redirect('/writer');
  })
})

router.get('/login', (req, res, next) => {
  res.render('vwAccount/login', { layout: false });
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('vwAccount/login', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/');
    });
  })(req, res, next);
})



module.exports = router;
