'use strict'

const mongoose = require('mongoose')
const hat = require('hat');
const Schema = mongoose.Schema
var Platform = mongoose.model('Platform');

const RequestSchema = new Schema({
    num_result: { type: Number },
    request_key: String,
    platform: { type: Schema.ObjectId, ref: Platform } 
}, { timestamps: true });

RequestSchema.pre('save', function (next) {
    this.request_key = hat();
    next();
});
module.exports = mongoose.model('Request', RequestSchema);