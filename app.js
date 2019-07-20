'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const app = express()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false, limit: '1000mb' }))
app.use(bodyParser.json({limit: '50mb'}))

module.exports = app
