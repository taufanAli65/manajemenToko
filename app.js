var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var efektivitasPromosiRouter = require('./routes/efektivitasPromosi');
var emailKampanyeRouter = require('./routes/emailKampanye');
var laporanRouter = require('./routes/laporan'); //laporan Penjualan
var penjualanRouter = require('./routes/penjualan');
var produkRouter = require('./routes/produk');
var promosiRouter = require('./routes/promosi');
var promosiProdukRouter = require('./routes/promosiProduk');
const { sequelize } = require('./models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/efektivitasPromosi', efektivitasPromosiRouter);
app.use('/emailKampanye', emailKampanyeRouter);
app.use('/laporan', laporanRouter);
app.use('/penjualan', penjualanRouter);
app.use('/produk', produkRouter);
app.use('/promosi', promosiRouter);
app.use('/promosiProduk', promosiProdukRouter);

sequelize.sync()
.then(() => {
  console.log("Database Berhasil Sinkron");
})
.catch(err => {
  console.error("Gagal Menyinkron Database");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
