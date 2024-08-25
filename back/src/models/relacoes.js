const Usuario = require('./usuario'); 
const Endereco = require('./endereco'); 
const Estado = require('./estado'); 
const Cidade = require('./cidade'); 

// Associações
Endereco.belongsTo(Cidade, { foreignKey: 'cidadeId' });
Endereco.belongsTo(Estado, { foreignKey: 'estadoId' });
Cidade.belongsTo(Estado, { foreignKey: 'estadoId' });
Cidade.hasMany(Endereco, { foreignKey: 'cidadeId' });
Estado.hasMany(Endereco, { foreignKey: 'estadoId' });
Estado.hasMany(Cidade, { foreignKey: 'estadoId' });

Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Endereco, { foreignKey: 'usuarioId' });

module.exports = {
  Usuario,
  Endereco,
  Estado,
  Cidade,
};
