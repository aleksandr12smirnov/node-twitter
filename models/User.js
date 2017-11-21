const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'You must supply a Username!'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'You must supply a Email Address!'
    },
    name: {
        type: String,
        required: 'You must supply a name!'
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
