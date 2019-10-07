'use strict'
const app = require('./app')
const {setupRedis} = require('./utils/db/redis')
const consign = require('consign');
const debug = require('debug')('app:server')
const {
    logErrors,
    clientErrorHandler,
    errorHandler
} = require("./utils/middlewares/errorsHandlers");
setupRedis()
consign({ cwd: __dirname })
    .include('config.js')
    .include('utils/db/mongo.js')
    .include('routes')
    .into(app);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);