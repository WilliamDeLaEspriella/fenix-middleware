const mongoose = require('mongoose');
const config = require('../config');
const Platform = require('./platforms');

const connectDb = () => {
  return mongoose.connect(config.db);
};

exports.modules = {
    connectDb
}