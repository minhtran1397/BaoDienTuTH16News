var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var categoryModel = require('./models/category.model.js');
var articleModel = require('./models/article.model.js');

var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(require('./middlewares/auth-locals.mdw'));



app.set('view engine', 'hbs');

app.use(express.static('views'));
app.use(require('./middlewares/locals.mdw'));

// app.get('/', (req, res) => {
//   res.render('home');
// })

// app.get('/', (req, res) => {
//   categoryModel.all()
//     .then(rows => {
//       res.render('home', {
//         homecategory: rows
//       });
//     }).catch(err => {
//       console.log(err);
//       res.end('error occured.')
//     });
// })

app.get('/', (req, res) => {
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
      res.render('home', {
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
// app.use('home',require('./routes/home.route'));
app.use('/guest/detailcategories',require('./routes/guests/guestdetailcategory.route'));

app.use('/writer', require('./routes/writer.route'))
app.use('/editor', require('./routes/editor.route'))
app.use('/account', require('./routes/account.route'))
app.use('/admin', require('./routes/admin.route'))
app.use('/subcriber', require('./routes/sub.route'))


app.use((req, res, next) => {
  res.render('404', { layout: false });
})

app.use((error, req, res, next) => {
  res.render('error', {
    layout: false,
    message: error.message,
    error
  })
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})