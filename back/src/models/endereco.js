const Sequelize = require("sequelize");
const conexao = require("../database/database");
const Cidade = require('./cidade'); 
const Usuario = require('./usuario'); 

const Endereco = conexao.define("endereco", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  logradouro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  complemento: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bairro: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cep: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cidadeId: {
    type: Sequelize.INTEGER,
    references: {
      model: "cidades", 
      key: "id",
    },
    allowNull: false,
  },
  estadoId: {
    type: Sequelize.INTEGER,
    references: {
      model: "estados",
      key: "id",
    },
    allowNull: false,
  },
  usuarioId: {
    type: Sequelize.INTEGER,
    references: {
      model: "usuarios",
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = Endereco;
