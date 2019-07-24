'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var hat = require('hat');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

const PlatformSchema = new Schema({
    email: { type: String, unique:true, lowercase: true, required: [true, "no puede estar en blanco"], match: [/\S+@\S+\.\S+/, 'en invalido'], index: true },
    full_name:{ type: String, lowercase: true, required: [true, "no puede estar en blanco"]},
    compania: { type: String, required: [true, "no puede estar en blanco"]},
    salt: { type: String},
    password: { type: String, required: [true, "no puede estar en blanco"]},
    api_key: String,
    tyc: Boolean
}, { timestamps: true });

PlatformSchema.plugin(uniqueValidator, { message: 'ya existe!' });

PlatformSchema.pre('save', function (next) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512').toString('hex');
    this.api_key = hat();
    next();
});

// PlatformSchema.methods.setPassword = function (password) {
// };

PlatformSchema.methods.validPassword = function (password) {
    console.log(this.salt)
    var password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.password === password;
};

PlatformSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        username: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

PlatformSchema.methods.toAuthJSON = function () {
    return {
        full_name: this.full_name,
        email: this.email,
        token: this.generateJWT(),
        compania: this.compania,
        api_key: this.api_key
    };
};
module.exports = mongoose.model('Platform', PlatformSchema);