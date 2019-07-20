'use strict'
const moment = require('moment');
const app = require('./app')
const db = require('./database/db')
const consign = require('consign');
moment.suppressDeprecationWarnings = true;
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

db.sequelize.sync().done(() => {
    debug('Connected succesfully to posgrsql');
    if (app.config.NODE_ENV != "producion") {
        app.listen(app.config.port, () => {
            debug('Server on port', app.config.port);
        });
    }
});

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);