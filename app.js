var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

const { User, Pesanan, Product, Pembayaran } = require('./modelDefine');
//import router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var productsOrderRouter = require('./routes/pesanan');
//import sequelize models 
const sequelize = require('./config/database');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware untuk memverifikasi token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Jika tidak ada token

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403); // Jika token tidak valid
    req.user = user;
    next(); 
  });
}

//routernya
app.use('/', indexRouter);
app.use('/api/', usersRouter);
app.use('/api/products', authenticateToken, productsRouter);
app.use('/api/order', authenticateToken, productsOrderRouter);

// Sinkronisasi database
sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch(err => console.log(err));

// Error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
