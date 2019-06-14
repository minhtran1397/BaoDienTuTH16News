var express = require('express');
var userModel = require('../models/user.model');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var auth = require('../middlewares/auth');

var router = express.Router();

router.get('/register', (req, res) => {

  userModel.allCate()
    .then(rows => {
      res.render('Req 3 - Writer/Register', {
        cate2: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });

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

router.post('/registeradd', (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

  var datetime = new Date();
  var numberOfDaysToAdd = 7;
  datetime.setDate(datetime.getDate() + numberOfDaysToAdd);


  var entity = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email,
    dob: dob,
    role: req.body.role,
    duration: datetime,
    idCategory: req.body.idCategory
  }

  userModel.add(entity).then(id => {
    res.redirect('/writer');
  })
})

router.get('/login', (req, res, next) => {
  res.render('Req 3 - Writer/Login', { layout: false });
})

router.get('/login2', (req, res, next) => {
  res.render('Req 3 - Writer/Login', { layout: false });
})


router.get('/login3', (req, res, next) => {
  res.render('Req 3 - Writer/Login', { layout: false });
})


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('Req 3 - Writer/Login', {
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

router.post('/login2', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('Req 3 - Writer/Login', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/writer');
    });
  })(req, res, next);
})


router.post('/login3', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('Req 3 - Writer/Login', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/editor');
    });
  })(req, res, next);
})


router.get('/profile', auth, (req, res, next) => {
  res.end('profile');
})

router.post('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/account/login');
})

module.exports = router;
