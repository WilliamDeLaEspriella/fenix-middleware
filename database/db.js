'use strict'
const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const config = require('../config')
let db = null;


  if(!db) {
    const sequelize = new Sequelize(config.database, config.user_database, config.password_database, {
        host: config.host,
        dialect: 'postgres',
      })
    db = {
      sequelize,
      models: {}
    };
    
    const dir = path.join(__dirname, '../models');
    fs.readdirSync(dir).forEach(filename => {
      const modelDir = path.join(dir, filename);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
    
    // Object.keys(db.models).forEach(key => {
    //   db.models[key].associate(db.models);
    // });
  }

module.exports = db