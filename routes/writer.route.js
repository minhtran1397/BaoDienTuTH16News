var express = require('express');
var writerModel = require('../models/writer.model');

var router = express.Router();

// router.get('/', (req, res) => {
//   writerModel.all()
//     .then(rows => {
//       res.render('Req 3 - Writer/WriterListArticle', {
//         article: rows
//       });
//     }).catch(err => {
//       console.log(err);
//       res.end('error occured.')
//     });
// })

router.get('/', (req, res, next) => {
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var limit = 8;
  var offset = (page - 1) * limit;


  Promise.all([
  writerModel.all(), writerModel.countByCat()
  ]).then(([rows,count_rows]) => {
   

    var total = count_rows[0].total;
    var nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    var pages = [];
    for (i = 1; i <= nPages; i++) {
      var obj = { value: i, active: i === +page };
      pages.push(obj);
    }

    res.render('Req 3 - Writer/WriterListArticle', {
      article: rows,
      pages
    });
  }).catch(next);
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
  res.render('Req 3 - Writer/WriterPostArticle');
})

router.post('/add', (req, res) => {
  articleModel.add(req.body).then(id => {
    res.render('Req 3 - Writer/WriterPostArticle');
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
