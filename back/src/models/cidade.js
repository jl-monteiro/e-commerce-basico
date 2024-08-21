const Sequelize = require('sequelize');
const conexao = require('../database/database');
const Estado = require('./estado')
const Endereco = require('./endereco')

const Cidade = conexao.define('cidade', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estadoId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'estados', // nome da tabela referenciada
            key: 'id'
        },
        allowNull: false
    }
});


module.exports = Cidade;
