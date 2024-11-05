const Usuario = require('./usuario');
const Endereco = require('./endereco');
const Estado = require('./estado');
const Cidade = require('./cidade');
const Categoria = require('./categoria');
const Produto = require('./produto');
const Carrinho = require('./carrinho')
const Itens_carrinho = require("./itens_carrinho");
const Pedidos = require('./pedidos');

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

Usuario.hasOne(Carrinho, { foreignKey: "usuarioId" })
Carrinho.hasMany(Itens_carrinho, { foreignKey: "carrinhoId" })
Itens_carrinho.belongsTo(Produto, { foreignKey: "produtoId" })
Produto.hasMany(Itens_carrinho, { foreignKey: "produtoId" })


Pedidos.belongsTo(Carrinho, { foreignKey: "carrinhoId" });  
Carrinho.hasOne(Pedidos, { foreignKey: "carrinhoId" });    
Pedidos.belongsTo(Endereco, { foreignKey: "enderecoId" });
Endereco.hasMany(Pedidos, { foreignKey: "enderecoId" });
Pedidos.belongsTo(Usuario, { foreignKey: "usuarioId" });
Usuario.hasMany(Pedidos, { foreignKey: "usuarioId" });

module.exports = {
  Usuario,
  Endereco,
  Estado,
  Cidade,
  Produto,
  Categoria,
  Carrinho,
  Itens_carrinho
};
