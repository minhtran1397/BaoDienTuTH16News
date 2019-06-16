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


router.get('/changePass', (req, res) => {

  userModel.allCate()
    .then(rows => {
      res.render('Req 3 - Writer/ChangePass', {
        cate2: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });

})

router.post('/changePass', auth, (req, res, next) => {
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.passwordNew, saltRounds);
  var entity = {
    id: req.user.id,
    password: hash,
  }

  userModel.changePass(entity).then(id => {
    res.redirect('/');
  })
})

router.get('/is-available', (req, res, next) => {
  var user = req.query.username;
  userModel.singleByUserName(user).then(rows => {
    if (rows.length > 0) {
      if(req.user && req.user.id == rows[0].id){
        return res.json(true);
      }
      else
        return res.json(false);
    }

    return res.json(true);
  })
})

router.get('passIs-available', (req, res, next) => {
  var passwordOld = req.query.passwordOld;
  userModel.singleByUserName(req.user.username).then(rows => {
    var ret = bcrypt.compareSync(passwordOld, rows[0].password);
    if (ret) {
        return res.json(true);
    }

    return res.json(false);
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
    idCategory: req.body.idCategory,
    nickname: req.body.nickname
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

router.get('/login4', (req, res, next) => {
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


router.post('/login4', (req, res, next) => {
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

      return res.redirect('/admin');
    });
  })(req, res, next);
})

router.get('/prolife', auth, (req, res, next) => {
  
  Promise.all([
    userModel.getAcc(req.user.id),
    userModel.allCate(),
    userModel.getCateById(req.user.idCategory)])
  .then(([rows,rows2, rows3]) => {
    res.render('Req 3 - Writer/Prolife', {
      account: rows[0],
      cate: rows2,
      namecate: rows3[0]
    });
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/updateProlife', auth, (req, res, next) => {
  userModel.update(req.body).then(id => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.post('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/account/login');
})

module.exports = router;
