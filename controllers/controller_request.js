'use strict'

const {setupRedis} = require('../utils/db/redis')
const Platform = require('../models/platforms')
const Re = require('../controllers/concerns/resquestable')

const allRequest = async (req, res) => {

    try {
        let platforms = await Platform.find({})
        await Re.allPlatformRequest(platforms, req.query)
        const dataPlatformKey = `platform`;
        setupRedis.get(dataPlatformKey, (err, platforms) => {
            if (platforms) {
                res.status(200).send({data: JSON.parse(platforms) })
            }else{
                res.status(404).send({error: 'not found' })
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    allRequest
}