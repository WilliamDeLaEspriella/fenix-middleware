'use strict'
const { sign_up, sign_in, get_platform } = require('../controllers/controller_auth')
const { allRequest } = require('../controllers/controller_request')
module.exports = app => {

    app.post('/sign_up', sign_up)
    app.post('/sign_in', sign_in)
    app.get('/platforms', get_platform);
    app.get('/search', allRequest)
    // app.get('/states/:state_id/cities', index)

    // app.get('/states/:state_id/cities/:id', show)

};