const Sequelize = require("sequelize")
const conexao = require("../database/database")

const Itens_pedido = conexao.define("pedido", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    pedidoId: {
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
        allowNull: false
    },
    qtd: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
},
    {
        tableName: "itens_pedido",
        timestamps: false
    })

module.exports = Itens_pedido