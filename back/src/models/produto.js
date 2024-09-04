const Sequelize = require('sequelize')
const conexao = require('../database/database')

const Produto = conexao.define("produto", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome_prod: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao_prod: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco_prod: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    imagem_prod: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoriaId: {
        type: Sequelize.INTEGER,
        references: {
            model: "categoria",
            key: "id"
        },
        allowNull: false
    }
})

module.exports = Produto