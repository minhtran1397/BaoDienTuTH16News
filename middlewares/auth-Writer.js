module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/account/login2');
    } else if (req.user.role =='writer') 
    next();
    else{
      res.render('ErrorLogin');
  }
  }
  