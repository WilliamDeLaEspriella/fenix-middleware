'use strict'

const Platform = require('../models/platforms')
const Request = require('../models/request')

const sign_up = async (req, res) => {
    if (!req.body.tyc) {
        return res.status(422).json({ error: 'Favor aceptar terminos y condiciones' })
    }
    if (req.body.password !== req.body.password_confirmation) {
        return res.status(422).json({ error: 'Contraseñas no coinciden!' })
    }

    const platform = new Platform({
        full_name: req.body.full_name,
        email: req.body.email,
        url: req.body.url,
        compania: req.body.compania,
        password: req.body.password,
        tyc: req.body.tyc
    })
    try {
        let p = await platform.save()
        res.status(200).json(p.toAuthJSON())
    } catch (error) {
        next(error)
    }
}

const sign_in = async (req, res) => {
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

const get_platform = async (req, res) => {
    try {
        let request = await Request.find({});
        let result = await Platform.populate(request, { path: "platform" })
        res.status(200).send({ result });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    sign_up,
    sign_in,
    get_platform
}
