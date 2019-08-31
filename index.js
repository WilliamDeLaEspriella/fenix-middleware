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

    setupRedis()

//creamos un cliente
// redisClient.on('connect', function() {
//     console.log('Conectado a Redis Server');
// });
// get photos list
// app.get('/photos', (req, res) => {

//     // key to store results in Redis store
//     const photosRedisKey = 'user:photos';

//     // Try fetching the result from Redis first in case we have it cached
//     return redisClient.get(photosRedisKey, (err, photos) => {

//         // If that key exists in Redis store
//         if (photos) {

//             return res.json({ source: 'cache', data: JSON.parse(photos) })

//         } else { // Key does not exist in Redis store

//             // Fetch directly from remote api
//             fetch('https://jsonplaceholder.typicode.com/photos')
//                 .then(response => response.json())
//                 .then(photos => {

//                     // Save the  API response in Redis store,  data expire time in 3600 seconds, it means one hour
//                     redisClient.setex(photosRedisKey, 3600, JSON.stringify(photos))

//                     // Send JSON response to client
//                     return res.json({ source: 'api', data: photos })

//                 })
//                 .catch(error => {
//                     // log error message
//                     console.log(error)
//                     // send error to the client 
//                     return res.json(error.toString())
//                 })
//         }
//     });
// });
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);