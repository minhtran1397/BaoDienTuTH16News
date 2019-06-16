var express = require('express');
var subModel = require('../models/sub.model');
var auth = require('../middlewares/auth-Sub');
var moment = require('moment');

var router = express.Router();



  router.get('/', auth, (req, res, next) => {
  
    Promise.all([
      subModel.allArticlePrenium(),
      subModel.allCate(),
      subModel.allArticlePreniumF()])
        .then(([rows, rows2, rows3]) => {
          // rows = rows+rows3;
          var n=rows.length;
          var m= rows3.length;
          var i=0;
          for (i = 0; i < m; i++) { 
            rows[n + i] = rows3[i];
          }
          rows.length = m +n;
          res.render('Req 2 - Subcriber/SubListArticle', {
            article: rows,
            cate : rows2
          });
        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });
      
    })

router.get('/view/:id',  auth, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('Req 2 - Subcriber/SubListArticle', {
        error: true
      });
    }
      
  Promise.all([
    subModel.singleML(id),
    subModel.allCategory(),]).then(([rows,rows2]) => {
      var mydate = new Date(req.user.duration);
      var date = new Date();
      var diff = mydate.getTime() - date.getTime();

    if (rows.length > 0 && diff>0 && rows[0].premium=='true') {
      res.render('Req 2 - Subcriber/Article', {
        error: false,
        article: rows[0],
        cate: rows2
      });
    } else if(rows.length > 0 && rows[0].premium=='false'){
      res.render('Req 2 - Subcriber/Article', {
        error: false,
        article: rows[0],
        cate: rows2
      });
    } else{
      res.render('Req 2 - Subcriber/Article', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;
