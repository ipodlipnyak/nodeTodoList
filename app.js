var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api')

var app = express();

//view engine setup
var expressVue = require("express-vue");
var vueOptions = {
	    head: {
	        title: 'Demo app',
	        // Meta tags
	        metas: [
	            { name: 'application-name', content: 'NodeTest' },
	            { name: 'description', content: 'A node.js todo list', id: 'desc' },
	            // Rel
	            { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
	            // Generic rel for things like icons and stuff
	        ],
	        // Scripts
	        scripts: [
	        	{ src: 'https://unpkg.com/axios/dist/axios.min.js' }
	            // { src: '/assets/scripts/hammer.min.js' },
	            // { src: '/assets/scripts/vue-touch.min.js', charset: 'utf-8' },
	            // Note with Scripts [charset] is optional defaults to utf-8
	            // ...
	        ],
	        // Styles
	        styles: [
//	            { style: '/assets/rendered/style.css' }
//	            { style: '/assets/rendered/style.css', type: 'text/css' }
	            // Note with Styles, [type] is optional...
	            // ...
	        ],
	    }
};
var expressVueMiddleware = expressVue.init(vueOptions);
app.use(expressVueMiddleware);


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


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
  res.renderVue('../../views/error.vue',{ error: err.status });
//  res.render('error');
});

module.exports = app;
