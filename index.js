'use strict'
const app = require('./app')
const mongoose = require('mongoose')
const consign = require('consign');
const debug = require('debug')('app:server')
const {
    logErrors,
    clientErrorHandler,
    errorHandler
} = require("./utils/middlewares/errorsHandlers");

consign({ cwd: __dirname })
    .include('config.js')
    .include('routes')
    .into(app);
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.connect(app.config.db, { useNewUrlParser: true })
    .then(() => {
        console.log('mongoDB is connected...')
        app.listen(app.config.port, () => {

            console.log(`API REST corriendo en http//localhost:${app.config.port}`)
        })
    })
    .catch((err) => {
        throw err
    })


app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);