var express = require('express');
var writerModel = require('../models/writer.model');
var auth = require('../middlewares/auth-Writer');
var auth2 = require('../middlewares/auth-Writer-Editor-Admin');
var router = express.Router();


router.get('/', auth, (req, res, next) => {
  Promise.all([
    writerModel.allCateByIdWriter(req.user.id),
    writerModel.TongSoByIdWriter(req.user.id),
    writerModel.allTag()])
    .then(([rows,rows2,rows3]) => {
      res.render('Req 3 - Writer/WriterListArticle', {
        article: rows,
        TongSo: rows2[0],
        tag: rows3
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

  Promise.all([
    writerModel.single2(id),
    writerModel.allTag(),
    writerModel.allCate2()]).then(([rows,rows2,rows3]) => {
    if (rows.length > 0 && rows[0].allow !='Allowed' &&rows[0].allow !='WaitForPost') {
      res.render('Req 3 - Writer/WriterEditArticle', {
        error: false,
        article: rows[0],
        tag: rows2,
        cate2: rows3
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

router.get('/view/:id', auth2, (req, res,next) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 3 - Writer/WriterListArticle', {
      error: true
    });
  }

  Promise.all([
    writerModel.singleML(id),
    writerModel.allCategory(),
    writerModel.allArticleCate(id)]).then(([rows,rows2,rows3]) => {
    if (rows.length > 0) {
      res.render('Req 3 - Writer/Article', {
        error: false,
        article: rows[0],
        cate: rows2,
        related: rows3
      });
    } else {
      res.render('Req 3 - Writer/Article', {
        error: true,
        related: rows3
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/split', auth, (req, res, next) => {
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

router.get('/add', auth, (req, res, next) => {

  Promise.all([
    writerModel.allCateByIdWriter(req.user.id),
    writerModel.TongSoByIdWriter(req.user.id),
    writerModel.allTag(),
    writerModel.allCate2()])
    .then(([rows,rows2,rows3,rows4]) => {
      res.render('Req 3 - Writer/WriterPostArticle', {
        article: rows,
        TongSo: rows2[0],
        tag: rows3,
        cate2: rows4
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.post('/add',auth, (req, res, next) => {
  var date = new Date();
  req.body.dateWriter = date;
  req.body.premium='';
  writerModel.add(req.body).then(id => {
    res.redirect('/writer');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/update', auth, (req, res, next)=> {
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
