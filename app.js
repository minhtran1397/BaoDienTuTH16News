var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var categoryModel = require('./models/category.model.js');

var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs({
  layoutsDir: 'views/_layouts',
  defaultLayout: 'main.hbs',

}));
app.set('view engine', 'hbs');

app.use(express.static('views'));
app.use(require('./middlewares/locals.mdw'));

app.get('/', (req, res) => {
  res.render('home');
})

app.use('/writer', require('./routes/writer.route'))
app.use('/editor', require('./routes/editor.route'))
// app.use('/admin/categories', require('./routes/admin/category.route'))


// app.use((req, res, next) => {
//   res.render('404', { layout: false });
// })

// app.use((error, req, res, next) => {
//   res.render('error', {
//     layout: false,
//     message: error.message,
//     error
//   })
// })

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
})