var express = require('express');
var articleModel = require('../models/article.model.js');
var categoryModel = require('../models/category.model.js');
var subModel = require('../models/sub.model');

var router = express.Router();

router.get('/', (req, res) => {
 
    Promise.all([
        categoryModel.all(),
        articleModel.allByAllCatAllowedInfo(),
        articleModel.top15MostViews(),
        articleModel.top10Newest(),
        articleModel.top1NewestEachCate(),    
        articleModel.top5Newest(),
        articleModel.top5to10Newest(),
        articleModel.top1Newest(),
        ]).then(([rows,rows2,rows3,rows4,rows5, rows6, rows7,rows8
          ]) => {
          res.render('Req 0 - Home/home', {
            allcategory: rows,
            articlebyallcat:rows2,
            articlemostviews:rows3,
            topnewest:rows4,
            top1eachcate:rows5,
            top5newest: rows6,
            top5to10newest: rows7,
            top1newest:rows8,
          });
        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });


})

router.post('/search', (req, res) => {
  var search = req.body.search;
  Promise.all([
    subModel.allSearch(search),
    subModel.allCate()])
      .then(([rows, rows2]) => {
        if(rows.length == '0'){
          res.render('Req 1 - Guest/ListArticle', {
            article: rows,
            cate : rows2,
            error: true,
            searchThat: search
          });
        } else{
          res.render('Req 1 - Guest/ListArticle', {
            article: rows,
            cate : rows2,
            error: false
          });
        }
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      });
    
  })


module.exports = router;
