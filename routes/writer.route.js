var express = require('express');
var writerModel = require('../models/writer.model');


var router = express.Router();

router.get('/', (req, res) => {
  
  Promise.all([
    writerModel.allCate(),
    writerModel.TongSo(),])
    .then(([rows,rows2]) => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows,
        TongSo: rows2[0]
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})


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

router.get('/view/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 3 - Writer/WriterListArticle', {
      error: true
    });
  }

  Promise.all([
    writerModel.singleML(id),
    writerModel.allCategory(),]).then(([rows,rows2]) => {
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

router.post('/split', (req, res) => {
    if(req.body.allow == 'all'){
      Promise.all([
        writerModel.allCate(),
        writerModel.TongSo(),]).then(([rows,rows2]) => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows,
        TongSo: rows2[0]
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
    }
    else{
      Promise.all([
        writerModel.allByAllow(req.body.allow),
        writerModel.TongSoAllow(req.body.allow),]).then(([rows,rows2]) => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows,
        TongSo: rows2[0]
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
    res.redirect('/writer');
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
