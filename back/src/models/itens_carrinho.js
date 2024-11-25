const Sequelize = require("sequelize")
const conexao = require("../database/database")

const Itens_carrinho = conexao.define("itens_carrinho", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    carrinhoId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'carrinho',
            key: 'id'
        },
        allowNull: false
    },
    produtoId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'produtos',
            key: 'id'
        },
        allowNull: false,
        onDelete: "CASCADE"
    },
    qtd: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
},
{
    tableName: "itens_carrinho",
    timestamps: false
})

module.exports = Itens_carrinho