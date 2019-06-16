var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var categoryModel = require('./models/category.model.js');

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

app.get('/', (req, res) => {
  res.render('home');
})

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