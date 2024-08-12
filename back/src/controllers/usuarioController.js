const Usuario = require('../models/usuario')
const status = require('http-status')
const bcrypt = require('bcryptjs')

exports.Insert = (req, res, next) => {
    const nome = req.body.nome
    const login = req.body.login
    const email = req.body.email
    const senha = req.body.senha
    const hash = bcrypt.genSaltSync(10)
    const senhaHash = bcrypt.hashSync(senha, hash)
    const tipo = req.body.tipo
    const token = req.body.token

    Usuario.create({
        nome: nome,
        login: login,
        email: email,
        senha: senhaHash,
        tipo: tipo,
        token: token
        
    }).then(usuario => {
        if (usuario) {
            res.status(status.OK).send(usuario)
        }
        else {
            res.status(status.NOT_FOUND).send()
        }
    }).catch(error => next(error))
}

exports.SearchAll = (req, res, next) => {
    Usuario.findAll()
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario)
            }
        }).catch(error => next(error))
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                res.status(status.OK).send(usuario)
            }
            else {
                res.status(status.NOT_FOUND).send()
            }
        }).catch(error => next(error))
}

exports.Update = (req, res, next) => {
    const id = req.params.id
    const nome = req.body.nome
    const email = req.body.email
    const login = req.body.login
    const senha = req.body.senha
    const hash = bcrypt.genSaltSync(10)
    const senhaHash = bcrypt.hashSync(senha, hash)
    const tipo = req.body.tipo
    const token = req.body.token

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.update({
                    nome: nome,
                    email: email,
                    login: login,
                    senha: senhaHash,
                    tipo: tipo,
                },
                    {
                        where: { id: id }
                    }
                ).then(() => {
                    res.status(status.OK).send()
                }).catch(error => next(error))
            }
            else {
                res.status(status.NOT_FOUND).send()
            }
        }).catch(error => next(error))
}

exports.Delete = (req, res, next) => {
    const id = req.params.id

    Usuario.findByPk(id)
        .then(usuario => {
            if (usuario) {
                usuario.destroy({
                    where: { id: id }
                }).then(() => {
                    res.status(status.OK).send()
                }).catch(error => next(error))
            }
            else {
                res.status(status.NOT_FOUND).send()
            }
        }).catch(error => next(error))
}