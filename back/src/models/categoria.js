const Sequelize = require('sequelize');
const conexao = require('../database/database');

const Categoria = conexao.define('categoria', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
});


module.exports = Categoria;
