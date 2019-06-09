var express = require('express');
var articleModel = require('../models/editor.model');

var router = express.Router();

router.get('/', (req, res) => {
  
Promise.all([
  articleModel.all(),
  articleModel.allCate(),
  articleModel.TongSo(),])
    .then(([rows, rows2, rows3]) => {
      res.render('Req 4 - Editor/Editor', {
        article: rows,
        cate : rows2,
        TongSo: rows3[0]
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
    articleModel.allCate(),]).then(([rows,rows2]) => {
    if (rows.length > 0) {
      res.render('Req 4 - Editor/EditorEdit', {
        error: false,
        article: rows[0],
        cate: rows2
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
    articleModel.allCate(),]).then(([rows,rows2]) => {
    if (rows.length > 0) {
      res.render('Req 4 - Editor/EditorEditTrue', {
        error: false,
        article: rows[0],
        cate: rows2
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

router.post('/success', (req, res) => {
  articleModel.updateTagAndCate(req.body).then(id => {
    res.render('Req 4 - Editor/Editor');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', (req, res) => {
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
