module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/account/login3');
    } 
    else if (req.user.role =='editor') 
        next();

    else{
        res.render('ErrorLogin');
    }
  }
  