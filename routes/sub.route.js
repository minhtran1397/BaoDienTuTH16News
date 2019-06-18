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

router.get('/view/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('Req 2 - Subcriber/SubListArticle', {
        error: true
      });
    }
      
  Promise.all([
    subModel.singleML(id),
    subModel.allCategory(),
    subModel.allArticleCate(id)]).then(([rows,rows2,rows3]) => {
      var diff=0;
      if(req.user){
        var mydate = new Date(req.user.duration);
        var date = new Date();
        diff = mydate.getTime() - date.getTime();
      }
    if (rows.length > 0 && diff>0 && rows[0].premium=='1') {
      res.render('Req 2 - Subcriber/Article', {
        error: false,
        article: rows[0],
        cate: rows2,
        related: rows3
      });
    } else if(rows.length > 0 && rows[0].premium==''){
      res.render('Req 2 - Subcriber/Article', {
        error: false,
        article: rows[0],
        cate: rows2,
        related: rows3
      });
    } else{
      res.render('Req 2 - Subcriber/Article', {
        error: true,
        article: rows[0],
        cate: rows2,
        related: rows3
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;
