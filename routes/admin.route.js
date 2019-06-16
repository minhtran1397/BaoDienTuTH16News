var express = require('express');
var adminModel = require('../models/admin.model');
var auth = require('../middlewares/auth-Admin');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var router = express.Router();

router.get('/', auth, (req, res, next) => {
  
Promise.all([
  adminModel.all(),
  adminModel.tongAllow(),
  adminModel.tongBlock(),
  adminModel.tongWaitA(),
  adminModel.tongWaitP(),
  adminModel.tongRole('subcriber'),
  adminModel.tongRole('writer'),
  adminModel.tongRole('editor')])
    .then(([rows, rows2, rows3, rows4, rows5,rows6,rows7,rows8]) => {
      res.render('Req 5 - Administrator/Administration', {
        article: rows,
        TongSo1 : rows2[0],
        TongSo2 : rows3[0],
        TongSo3 : rows4[0],
        TongSo4 : rows5[0],
        TongSo5 : rows6[0],
        TongSo6 : rows7[0],
        TongSo7 : rows8[0]
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

    
  router.get('/user', auth, (req, res, next) => {
  
    Promise.all([
      adminModel.allUser(),
      adminModel.all()])
        .then(([rows, rows2]) => {
          
          res.render('Req 5 - Administrator/User', {
            user: rows,
            cate2sad : rows2
          });
        }).catch(err => {
          console.log(err);
          res.end('error occured.')
        });
      
    })


router.get('/article', auth, (req, res, next) => {

  Promise.all([
    adminModel.all(),
    adminModel.allCate()])
      .then(([rows, rows2]) => {
        
        res.render('Req 5 - Administrator/Article', {
          article: rows,
          cate : rows2
        });
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      });
    
  })

router.get('/category/edit/:id',auth, (req, res) => {
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


router.get('/tag/edit/:id',auth, (req, res) => {
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


router.get('/user/edit/:id',auth, (req, res, next) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 5 - Administrator/User', {
      error: true
    });
  }


  Promise.all([
    adminModel.singleIdUser2(id),
    adminModel.singleIdUser3(id),
    adminModel.allTag(),
    adminModel.allCate()]).then(([rows, rowall,rows2,rows3]) => {
    if (rows.length > 0) {
      res.render('Req 5 - Administrator/UserEdit', {
        error: false,
        user: rowall[0],
        tagall: rows2,
        cate: rows3,
        user2: rows[0]
      });
    } else {
      res.render('Req 5 - Administrator/UserEdit', {
        error: true
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/articleEdit/:id',auth, (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 5 - Administrator/Article', {
      error: true
    });
  }

  Promise.all([
    adminModel.single2(id),
    adminModel.allTag(),
    adminModel.allCate()]).then(([rows,rows2,rows3]) => {
    if (rows.length > 0) {
      res.render('Req 5 - Administrator/ArticleEdit', {
        error: false,
        article: rows[0],
        tag: rows2,
        cate2: rows3
      });
    } else {
      res.render('Req 5 - Administrator/ArticleEdit', {
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

router.post('/user/add', auth, (req, res, next) => {
  
  var saltRounds = 10;
  var hash = bcrypt.hashSync(req.body.password, saltRounds);
  var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

  var datetime = new Date();
  var numberOfDaysToAdd = 7;
  datetime.setDate(datetime.getDate() + numberOfDaysToAdd);


  var entity = {
    username: req.body.username,
    password: hash,
    name: req.body.name,
    email: req.body.email,
    dob: dob,
    role: req.body.role,
    duration: datetime,
    idCategory: req.body.idCategory,
    nickname: req.body.nickname
  }

  adminModel.addUser(entity).then(id => {
    res.redirect('/admin/user');
  })
})

  router.post('/userUpdate', auth, (req, res, next) => {
    adminModel.updateUser(req.body).then(id => {
      res.redirect('/admin/user');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })


router.post('/articleUpdate', auth, (req, res, next)=> {
  adminModel.updateArticle(req.body).then(n => {
    res.redirect('/admin/article');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.post('/articleAdd', auth, (req, res, next) => {
  var datetime = new Date();
  req.body.dateWriter = datetime;
  adminModel.addArticle(req.body).then(id => {
    res.redirect('/admin/article');
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

router.get('/user/add', auth, (req, res) => {
  Promise.all([
    adminModel.all(),
    adminModel.allCate()])
    .then(([rows, rows2]) => {
      res.render('Req 5 - Administrator/UserAdd', {
        categories: rows,
        cate: rows2
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.get('/articleAdd', auth, (req, res) => {
  Promise.all([
    adminModel.allTag(),
    adminModel.allCate()])
    .then(([rows, rows2]) => {
      res.render('Req 5 - Administrator/ArticleAdd', {
        tag: rows,
        cate: rows2
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

router.get('/user/delete/:id', auth, (req, res) => {
  var id = req.params.id;
  adminModel.deleteUser(id).then(n => {
    res.redirect('/admin/user');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/articleDelete/:id', auth, (req, res) => {
  var id = req.params.id;
  adminModel.deleteArticle(id).then(n => {
    res.redirect('/admin/article');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.get('/articlePub/:id', auth, (req, res) => {
  var id = req.params.id;
  var datetime = new Date();
  var entity = {
    id: id,
    allow: 'Allowed',
    datePost: datetime
  }
  adminModel.updateArticle(entity).then(n => {
    res.redirect('/admin/article');
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


router.get('/userUpDur/:id', auth, (req, res) => {
  var id = req.params.id;
  adminModel.findUser(id).then(n => {
    if(n[0].role != 'subcriber'){
      res.render('Req 5 - Administrator/UserUpDuration', {
        error: true
      });
    }else{
      res.render('Req 5 - Administrator/UserUpDuration', {
        error: false,
        user: n[0]
      });
    }
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})


router.post('/userSplit', auth, (req, res, next) => {
  if(req.body.role == 'all'){
    Promise.all([
      adminModel.all(),
      adminModel.allUser(),]).then(([rows,rows2]) => {
    res.render('Req 5 - Administrator/User', {
      article: rows,
      user: rows2
    });
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
  }
  else{
    Promise.all([
      adminModel.all(),
      adminModel.allRole(req.body.role),]).then(([rows,rows2]) => {
    res.render('Req 5 - Administrator/User', {
      article: rows,
      user: rows2
    });
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });}
})

module.exports = router;
