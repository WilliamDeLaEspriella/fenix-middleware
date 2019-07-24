'use strict'

const Platform = require('../models/platforms')

const sign_up = async (req, res, next) => {
    if (!req.body.tyc) {
        return res.status(422).json({ error: 'Favor aceptar terminos y condiciones' })
    }
    if (req.body.password !== req.body.password_confirmation) {
        return res.status(422).json({ error: 'Contraseñas no coinciden!' })
    }
    console.log(req.body)
    const platform = new Platform({
        full_name: req.body.full_name,
        email: req.body.email,
        compania: req.body.compania,
        password: req.body.password,
        tyc: req.body.tyc
    })
    try {
        let p = await platform.save()
        console.log(p.toAuthJSON())
        res.status(200).json(p.toAuthJSON())
    } catch (error) {
        next(error)
    }
}

const sign_in = async (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    try {
        let platform = await Platform.findOne({ email: email })
        if (platform.validPassword(password)) {
            res.status(200).json(platform.toAuthJSON())
        } else {
            res.status(422).json({ error: "Email o contraseña no encontrado" })
        }

    } catch (error) {
        res.status(422).json({ error: "Email o contraseña no encontrado" })
    }
}
// function cambiarContraseña(req, rest) {
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) res.status(503).send({ message: err })
//         bcrypt.hash(req.body.password, salt, null, (err, hash) => {
//             if (err) res.status(503).send({ message: err })
//             User.findByIdAndUpdate(req.user, { password: hash }, (err, user) => {
//                 if (err) return rest.status(500).send({ message: err })
//                 if (user == null) return rest.status(203).json('Email no encontrado.')

//                 rest.status(200).json('Contraseña Cambiada')


//             })

//         })
//     })


// }
// function cerrarSesion(req, res) {
//     User.findById(req.user, (err, user) => {
//         if (err) res.status(503).send({ message: err })

//         var index = user.token.indexOf(req.body.token);
//         user.token.splice(index, 1);
//         user.save((err, user) => {
//             if (err) return res.status(500).send({ message: err })
//             res.status(200).json('Gracias por Usar nuestra App')
//         })
//     })
// }

// function function_name(array, name) {
//     for (var i = array.length - 1; i >= 0; i--) {
//         if (array[i] == name) {
//             return true
//         }
//     }
//     return false
// }
module.exports = {
    sign_up,
    sign_in
    // signIn,
    // cambiarContraseña,
    // cerrarSesion
}
