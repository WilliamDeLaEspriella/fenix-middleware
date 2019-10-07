const api = require('../../utils/axios')
const {setupRedis} = require('../../utils/db/redis')
const Request = require('../../models/request')

const allPlatformRequest = async ({platforms, querys})=>{
    platforms.map( async ({url, id})=>{
       result = await api.PlatformRequest(url + '/' + querys)
        if (result.data.length){
            saveRequestInRedis(result.data)
            await Request.create({
                num_result: result.data.length,
                platform: id
            })
        }
    })
}

const saveRequestInRedis = (data, emailUser) =>{
    const dataPlatformKey = `platform:${emailUser}`;
    setupRedis.setex(dataPlatformKey, 3600, JSON.stringify(data))
}
