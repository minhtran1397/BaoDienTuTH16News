module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect('account/login4');
  } else if (req.user.role =='admin') 
      next();
  else{
    res.render('ErrorLogin');
  }
}
