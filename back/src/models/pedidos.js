const Sequelize = require("sequelize")
const conexao = require("../database/database")

const Pedidos = conexao.define("pedidos", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM("pendente", "aprovado"),
        allowNull: false
    },
    valorTotal: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    carrinhoId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'carrinho',
            key: "id"
        },
        onDelete: "CASCADE"
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: "id"
        },
        onDelete: "SET NULL"
    }
},

)

module.exports = Pedidos