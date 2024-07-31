const Sequelize = require('sequelize')
const conexao = require('../database/database')

const Usuario = conexao.define("usuario", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3,100]
        }
    },
    login: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
        validate: {
            len: [3,50]
        }
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [7,100]
        }
    }

})

module.exports = Usuario