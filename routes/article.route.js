var express = require('express');
var articleModel = require('../models/article.model');

var router = express.Router();

router.get('/', (req, res) => {
  articleModel.all()
    .then(rows => {
      res.render('Req 3 - Writer/WriterListArticle', {
        categories: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('admin/vwCategories/edit', {
      error: true
    });
  }

  articleModel.single(id).then(rows => {
    if (rows.length > 0) {
      res.render('admin/vwCategories/edit', {
        error: false,
        category: rows[0]
      });
    } else {
      res.render('admin/vwCategories/edit', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/add', (req, res) => {
  res.render('admin/vwCategories/add');
})

router.post('/add', (req, res) => {
  articleModel.add(req.body).then(id => {
    res.render('admin/vwCategories/add');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', (req, res) => {
  articleModel.update(req.body).then(n => {
    res.redirect('/admin/categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/delete', (req, res) => {
  articleModel.delete(req.body.CatID).then(n => {
    res.redirect('/admin/categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;
