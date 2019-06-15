var express = require('express');
var adminModel = require('../models/admin.model');
var auth = require('../middlewares/auth-Admin');
var router = express.Router();

router.get('/', auth, (req, res, next) => {
  
Promise.all([
  adminModel.all(),
  adminModel.allCate()])
    .then(([rows, rows2]) => {
      res.render('Req 5 - Administrator/Administration', {
        article: rows,
        cate : rows2
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  
})

router.get('/category', auth, (req, res, next) => {
  
  Promise.all([
    adminModel.allCate(),
    adminModel.all()])
      .then(([rows, rows2]) => {
        res.render('Req 5 - Administrator/Category', {
          cate: rows,
          cate2sad : rows2
        });
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      });
    
  })


  router.get('/tag', auth, (req, res, next) => {
  
    Promise.all([
      adminModel.allTag(),
      adminModel.all()])
        .then(([rows, rows2]) => {
          res.render('Req 5 - Administrator/Tag', {
            tag: rows,
            cate2sad : rows2
          });
        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });
      
    })

router.get('/category/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 5 - Administrator/Category', {
      error: true
    });
  }

  Promise.all([
    adminModel.singleIdCate(id),
    adminModel.allTag()]).then(([rows,rows2]) => {
    if (rows.length > 0 ) {
      res.render('Req 5 - Administrator/CategoryEdit', {
        error: false,
        cate: rows[0],
        tag: rows2,
      });
    } else {
      res.render('Req 5 - Administrator/CategoryEdit', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.get('/tag/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 5 - Administrator/Tag', {
      error: true
    });
  }

  Promise.all([
    adminModel.singleIdTag(id),
    adminModel.allTag()]).then(([rows,rows2]) => {
    if (rows.length > 0) {
      res.render('Req 5 - Administrator/TagEdit', {
        error: false,
        tag: rows[0],
        tagall: rows2,
      });
    } else {
      res.render('Req 5 - Administrator/TagEdit', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/category/update', auth, (req, res, next) => {
  adminModel.updateCate(req.body).then(id => {
    res.redirect('/admin/category');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/tag/update', auth, (req, res, next) => {
  adminModel.updateTag(req.body).then(id => {
    res.redirect('/admin/tag');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.post('/category/add', auth, (req, res, next) => {
  adminModel.addCate(req.body).then(id => {
    res.redirect('/admin/category');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/tag/add', auth, (req, res, next) => {
  adminModel.addTag(req.body).then(id => {
    res.redirect('/admin/tag');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/category/add', auth, (req, res) => {
  adminModel.all()
    .then(rows => {
      res.render('Req 5 - Administrator/CategoryAdd', {
        categories: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.get('/tag/add', auth, (req, res) => {
  adminModel.all()
    .then(rows => {
      res.render('Req 5 - Administrator/TagAdd', {
        categories: rows
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})



router.get('/category/delete/:id', auth, (req, res) => {
  var id = req.params.id;
  adminModel.deleteCate(id).then(n => {
    res.redirect('/admin/category');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/tag/delete/:id', auth, (req, res) => {
  var id = req.params.id;
  adminModel.deleteTag(id).then(n => {
    res.redirect('/admin/tag');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.get('/category/is-available', (req, res, next) => {
  var user = req.query.name;
  adminModel.singleIdCateName(user).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    }

    return res.json(true);
  })
})

router.get('/tag/is-available', (req, res, next) => {
  var user = req.query.name;
  adminModel.singleIdTagName(user).then(rows => {
    if (rows.length > 0) {
      return res.json(false);
    }

    return res.json(true);
  })
})

module.exports = router;
