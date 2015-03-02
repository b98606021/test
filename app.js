require('./lib/db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
    key:'node',
    secret:'hello',
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', users.users);
app.get('/register', users.register);
app.get('/signin', users.signin);
app.get('/signout', users.signout);
app.get('/forget', users.forget);
app.get('/add_article', users.add_article);
app.get('/profile', users.profile);
app.get('/modify/:id', users.modify);
app.get('/message/:id', users.message);
app.post('/apis/login', users.login);
app.post('/apis/add', users.add);
app.get('/apis/delete/:id', users.del_article);
app.post('/apis/update/:id', users.update);
app.post('/apis/comment/:id', users.comment);

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
