var express = require('express');
var writerModel = require('../models/writer.model');


var router = express.Router();

router.get('/', (req, res) => {
  writerModel.allCate()
    .then(rows => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

// router.get('/', (req, res, next) => {
//   var page = req.query.page || 1;
//   if (page < 1) page = 1;

//   var limit = 8;
//   var offset = (page - 1) * limit;


//   Promise.all([
//   writerModel.all(), writerModel.countByCat()
//   ]).then(([rows,count_rows]) => {
   

//     var total = count_rows[0].total;
//     var nPages = Math.floor(total / limit);
//     if (total % limit > 0) nPages++;
//     var pages = [];
//     for (i = 1; i <= nPages; i++) {
//       var obj = { value: i, active: i === +page };
//       pages.push(obj);
//     }

//     res.render('Req 3 - Writer/WriterListArticle', {
//       article: rows,
//       pages
//     });
//   }).catch(next);
// })

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 3 - Writer/WriterListArticle', {
      error: true
    });
  }
  writerModel.single(id).then(rows => {
    if (rows.length > 0 && rows[0].allow !='Allowed' &&rows[0].allow !='WaitForPost') {
      res.render('Req 3 - Writer/WriterEditArticle', {
        error: false,
        article: rows[0]
      });
    } else {
      res.render('Req 3 - Writer/WriterEditArticle', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/split', (req, res) => {
    if(req.body.allow == 'all'){
      writerModel.allCate()
    .then(rows => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
    }
    else{
    writerModel.allByAllow(req.body.allow).then(rows => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });}
})

router.get('/add', (req, res) => {
  res.render('Req 3 - Writer/WriterPostArticle');
})

router.post('/add', (req, res) => {
  writerModel.add(req.body).then(id => {
    res.render('Req 3 - Writer/WriterListArticle');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', (req, res) => {
  writerModel.update(req.body).then(n => {
    res.redirect('/writer');
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
