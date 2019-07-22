'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var hat = require('hat');

const PlatformSchema = new Schema({
    email: { type: String, lowercase: true, required: [true, "no puede estar en blanco"], match: [/\S+@\S+\.\S+/, 'en invalido'], index: true },
    full_name: String,
    compañia: String,
    password: String,
    api_key: String,
    tyc: Boolean
}, { timestamps: true });

PlatformSchema.plugin(uniqueValidator, { message: 'ya está elegido.' });

PlatformSchema.pre('save', function (next) {
    this.api_key = hat();
    next();
});

PlatformSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

PlatformSchema.methods.validPassword = function (password) {
    var password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === password;
};

PlatformSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

PlatformSchema.methods.toAuthJSON = function () {
    return {
        username: this.full_name,
        email: this.email,
        token: this.generateJWT(),
        bio: this.compañia,
        image: this.api_key
    };
};
mongoose.model('Platform', PlatformSchema);