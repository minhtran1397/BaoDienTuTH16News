var express = require('express');
var articleModel = require('../models/editor.model');
var auth = require('../middlewares/auth');
var auth = require('../middlewares/auth-Editor');

var router = express.Router();

router.get('/', auth, (req, res, next) => {
  
Promise.all([
  articleModel.allByIdEditor(req.user.id),
  articleModel.allCate(),
  articleModel.TongSo(),
  articleModel.allAllow(),
  articleModel.allBlock()])
    .then(([rows, rows2, rows3, rows4,rows5]) => {
      res.render('Req 4 - Editor/Editor', {
        article: rows,
        cate : rows2,
        TongSo: rows3[0],
        allow: rows4[0],
        block: rows5[0]
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  
})

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 4 - Editor/Editor', {
      error: true
    });
  }
  Promise.all([
    articleModel.single(id),
    articleModel.allCate(),
    articleModel.allAllow(),
    articleModel.allBlock()]).then(([rows,rows2,rows3,rows4]) => {
    if (rows.length > 0) {
      res.render('Req 4 - Editor/EditorEdit', {
        error: false,
        article: rows[0],
        cate: rows2,
        allow: rows3,
        block: rows4
      });
    } else {
      res.render('Req 4 - Editor/EditorEdit', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.get('/editTrue/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 4 - Editor/Editor', {
      error: true
    });
  }
  Promise.all([
    articleModel.single(id),
    articleModel.allCate(),
    articleModel.allCate2(),
    articleModel.allTag(),
    articleModel.allAllow(),
    articleModel.allBlock()]).then(([rows,rows2,rows3,rows4, rows5,rows6]) => {
    if (rows.length > 0) {
      res.render('Req 4 - Editor/EditorEditTrue', {
        error: false,
        article: rows[0],
        cate: rows2,
        cate2: rows3,
        tag: rows4,
        allow: rows5,
        block: rows6
      });
    } else {
      res.render('Req 4 - Editor/EditorEditTrue', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.get('/add',  auth, (req, res, next) => {
  res.render('Req 3 - Writer/WriterPostArticle');
})

router.post('/add', auth, (req, res, next) => {
  articleModel.add(req.body).then(id => {
    res.render('Req 3 - Writer/WriterPostArticle');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/success',  auth, (req, res, next) => {
  articleModel.updateTagAndCate(req.body).then(id => {
    res.render('Req 4 - Editor/Editor');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', auth, (req, res, next) => {
  articleModel.update(req.body).then(n => {
    res.redirect('/editor');
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


router.get('/view/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 3 - Writer/WriterListArticle', {
      error: true
    });
  }

  Promise.all([
    articleModel.singleML(id),
    articleModel.allCategory(),]).then(([rows,rows2]) => {
    if (rows.length > 0) {
      res.render('Req 3 - Writer/Article', {
        error: false,
        article: rows[0],
        cate: rows2
      });
    } else {
      res.render('Req 3 - Writer/Article', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;
