/**
 * Created by Nawfal on 12-Oct-15.
 */

var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');
function hashPW(pwd) {
	return crypto.createHash('sha256').update(pwd).
		digest('base64').toString();
}
exports.signup = function (req, res) {
	console.log(req.body.username+'  '+ req.body.password+'  '+req.body.email);
	console.log(JSON.stringify(req.body));
	var user = new User({username: req.body.username});
	user.set('hashed_password', hashPW(req.body.password));
	user.set('email', req.body.email);
	console.log(JSON.stringify(user));

	user.save(function (err) {
		if (err) {
			res.sessor.error = err;
			res.redirect('/dialog');
		} else {
			req.session.user = user._id;
			req.session.username = user.username;
			req.session.msg = 'Authenticated as ' + user.username;
			res.redirect('/');

		}

	})
};
exports.login = function (req, res) {
	User.findOne({username: req.body.username})
		.exec(function (err, user) {
			if (!user) {
				err = "User Not Found";
			} else {
				if (user.hased_password ===
					hashPW(req.body.password.toString())) {
					req.session.regenerate(function () {
						req.session.user = user._id;
						req.session.username = user.username;
						req.session.msg = 'Authenticated as ' + user.username;
						res.redirect('/');
					})
				} else {
					err = 'Authentication Failed';
				}
				if (err) {
					req.session.regenerate(function () {
						req.session.msg = err;
						res.redirect('/login');
					});
				}
			}
		});
};
exports.getUserProfile = function (req, res) {
	User.findOne({_id: req.session.user})
		.exec(function (err, user) {
			if (!user) {
				res.json(404, 'User Not Found');
			} else {
				console.log('get user profile: '+JSON.stringify(user));
				res.json(user);
			}
		})
};

exports.updateUser = function (req, res) {
	console.log('user-controller-updateUser:'+req.session.user);
	User.findOne({_id: req.session.user})
		.exec(function (err, user) {
			user.set('email', req.body.email);
			user.set('color', req.body.color);
			user.save(function (err) {
				if (err) {
					res.sessor.error = err;
				} else {
					req.session.msg = 'User Updated.'
				}
				res.redirect('/');
			})
		})
};

exports.deleteUser = function (req, res) {
	User.findOne({_id: req.session.user})
		.exec(function (err, user) {
			if (user) {
				user.remove(function (err) {
					if (err) {
						req.session.msg = err;
					} else {
						req.session.destroy(function () {
							res.redirect('/');
						});
					}
				});
			}
		});
};
