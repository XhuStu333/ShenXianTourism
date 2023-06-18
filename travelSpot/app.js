var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.engine('.html',require('ejs').__express);
app.set('view engine','html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//跨域
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.all('/*',function(req,res,next){
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type,Content-Length, Authorization, Accept');
  res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
  if(req.method=='OPTIONS'){
    res.sendStatus(200);
  }else{
    next();
  }
});

app.use('/', indexRouter);
app.use('/static',express.static('public'));

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
