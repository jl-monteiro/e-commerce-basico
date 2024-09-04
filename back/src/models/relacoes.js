const Usuario = require('./usuario');
const Endereco = require('./endereco');
const Estado = require('./estado');
const Cidade = require('./cidade');
const Categoria = require('./categoria');
const Produto = require('./produto');

// Associações
Endereco.belongsTo(Cidade, { foreignKey: 'cidadeId' });
Endereco.belongsTo(Estado, { foreignKey: 'estadoId' });
Cidade.belongsTo(Estado, { foreignKey: 'estadoId' });
Cidade.hasMany(Endereco, { foreignKey: 'cidadeId' });
Estado.hasMany(Endereco, { foreignKey: 'estadoId' });
Estado.hasMany(Cidade, { foreignKey: 'estadoId' });

Endereco.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Endereco, { foreignKey: 'usuarioId' });

Produto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'Categoria' })
Categoria.hasMany(Produto, { foreignKey: 'categoriaId', as: 'Categoria' })

module.exports = {
  Usuario,
  Endereco,
  Estado,
  Cidade,
  Produto,
  Categoria,
};
