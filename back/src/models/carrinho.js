const Sequelize = require("sequelize")
const conexao = require("../database/database")

const Carrinho = conexao.define("carrinho", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    usuarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        },
        allowNull: false
    },

},
{
    tableName: "carrinho",
    timestamps: false
}
)

module.exports = Carrinho