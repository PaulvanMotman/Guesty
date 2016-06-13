var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash')

var app = express();

var index      = require('./routes/index');
var unknown    = require('./routes/unknown');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))
app.use(flash())
app.use(function(req, res, next) {
   res.locals.errorMessage = req.flash('error')
   next()
});

app.get('/', function(req, res) {
 res.redirect('/index')
})

app.use('/index', index);
app.use('/unknow', unknown);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
 app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
     message: err.message,
     error: err
   });
 });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
 res.status(err.status || 500);
 res.render('error', {
   message: err.message,
   error: {}
 });
});

module.exports = app;
