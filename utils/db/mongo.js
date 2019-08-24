const mongoose = require('mongoose')

module.exports = app => {

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

};