module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/account/login');
    } 
    else if (req.user.role =='subcriber') 
        next();

    else{
        res.render('ErrorLogin');
    }
  }
  