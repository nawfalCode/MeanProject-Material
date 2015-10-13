/**
 * Created by Nawfal on 12-Oct-15.
 */
var mongoose = require('mongoose');
Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	email: String,
	color: String,
	hashed_password: String
});
mongoose.model('User',UserSchema);
