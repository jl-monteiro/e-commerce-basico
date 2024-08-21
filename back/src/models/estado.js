const Sequelize = require('sequelize');
const conexao = require('../database/database');
const Cidade = require('./cidade')

const Estado = conexao.define('estado', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_estado: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Estado;
