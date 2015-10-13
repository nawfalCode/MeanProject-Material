/**
 * Created by Nawfal on 12-Oct-15.
 */
var crypto = require('crypto');
var express = require('express');
module.exports = function (app) {
	var users = require('./controllers/user_controller');
	app.use('/static', express.static('./static')).
		use('/lib', express.static('../lib'));
	app.get('/', function (req, res) {
		if (req.session.user) {
			res.render('index', {
				username: req.session.username,
				msg: req.session.meg
			});
		} else {
			req.session.msg = 'Access Denied';
			res.redirect('/login');
		}
	});
	app.get('/user', function (req, res) {
		if (req.session.user) {
			res.render('user', {msg: req.session.msg});
		} else {
			req.session.msg = 'Access Denied';
			res.render('/login');
		}
	});
	app.get('/dialog', function (req, res) {
		if (req.session.user) {
			res.redirect('/');
		}
		res.render('dialog', {msg: req.session.msg});
	});
	app.get('/login', function (req, res) {
		if (req.session.user) {
			res.redirect('/');
		}
		res.render('login', {msg: req.session.msg});
		app.get('/logout', function (req, res) {
			req.session.destroy(function () {
				res.redirect('/login');
			});
		});
	});
	app.get('/logout', function (req, res) {
		req.session.destroy(function () {
			res.redirect('/login');
		});
	});
	app.post('/dialog', users.signup);
	app.post('/user/update', users.updateUser);
	app.post('/user/delete', users.deleteUser);
	app.post('/login', users.login);
	app.get('/user/profile', users.getUserProfile);
};



















