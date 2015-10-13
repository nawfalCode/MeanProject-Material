/**
 * Created by Nawfal on 12-Oct-15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
var app = express();
console.log('We will start onnectiong to mongo');
var conn = mongoose.connect('mongodb://localhost:27017/db');

mongoose.connection.on('open',function(err){
console.log('We got aconnection')
	app.engine('.html', require('ejs').__express);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.static(__dirname + '/bower_components'));
	app.use(bodyParser());
	app.use(cookieParser());
	app.use(expressSession({
		secret: 'SECRET',
		cookie: {maxAge: 60 * 60 * 1000},
		store: new mongoStore({
			db: mongoose.connection.db,
			collection: 'sessions'
		})
	}));
	console.log('Start routing');
	require('./routes')(app);
	app.listen(8888);
});
mongoose.connection.on('error', function (err) {
	console.log('mongodb error:'+err);
});

