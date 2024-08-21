const Usuario = require("./usuario");
const Endereco = require("./endereco");
const Estado = require("./estado");
const Cidade = require("./cidade");

Endereco.belongsTo(Cidade, { foreignKey: "cidadeId" });
Cidade.belongsTo(Estado, { foreignKey: "estadoId" });
Cidade.hasMany(Endereco, { foreignKey: "cidadeId" });
Estado.hasMany(Cidade, { foreignKey: "estadoId" });

Endereco.belongsTo(Usuario, { foreignKey: "usuarioId" });
Usuario.hasMany(Endereco, { foreignKey: "usuarioId" });

module.exports = {
  Usuario,
  Endereco,
  Estado,
  Cidade,
};
