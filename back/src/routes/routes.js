const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");
const ProdutoController = require("../controllers/produtoController");
const EnderecoController = require("../controllers/enderecoController");
const EstadoController = require("../controllers/estadoController");
const CidadeController = require("../controllers/cidadeController");
const uploadUser = require("../../middlewares/uploadImg");
const CategoriaController = require("../controllers/categoriaController");
const carrinhoController = require("../controllers/carrinhoController");
const itens_carrinhoController = require("../controllers/Itens_carrinhoController");

//rotas da tabela usuarios
router.post("/usuarios", UsuarioController.Insert);
router.get("/usuarios", UsuarioController.SearchAll);
router.get("/usuarios/:id", UsuarioController.SearchOne);
router.put("/usuarios/:id", UsuarioController.Update);
router.delete("/usuarios/:id", UsuarioController.Delete);

//rotas da tabela produto
router.post("/produtos", uploadUser.single("image"), ProdutoController.Insert);
router.get("/produtos", ProdutoController.SearchAll);
router.get("/produtos/:id", ProdutoController.SearchOne);
router.put(
  "/produtos/:id",
  uploadUser.single("image"),
  ProdutoController.Update
);
router.delete("/produtos/:id", ProdutoController.Delete);
router.post("/produtos/delete-image", ProdutoController.DeleteImg);

// Rotas da tabela endereco
router.post("/enderecos", EnderecoController.Insert);
router.get("/enderecos", EnderecoController.SearchAll);
router.get("/enderecos/usuario/:idUser", EnderecoController.SearchByUser);
router.get("/enderecos/:id", EnderecoController.SearchOne);
router.put("/enderecos/:id", EnderecoController.Update);
router.delete("/enderecos/:id", EnderecoController.Delete);

// Rotas da tabela estado
router.get("/estados", EstadoController.SearchAll);
router.get("/estados/:id", EstadoController.SearchOne);

// Rotas da tabela cidade
router.get("/cidades", CidadeController.SearchAll);
router.get("/cidades/:id", CidadeController.SearchOne);

// rotas tabela categoria
router.post("/categorias", CategoriaController.Insert)
router.get("/categorias", CategoriaController.SearchAll)
router.get("/categorias/:id", CategoriaController.SearchOne)
router.put("/categorias/:id", CategoriaController.Update)
router.delete("/categorias/:id", CategoriaController.Delete)

// rotas tabela carrinho
router.post("/carrinho", carrinhoController.Insert)
router.get("/carrinho/:usuarioId", carrinhoController.SearchCarrinho)
router.delete("/carrinho/:id", carrinhoController.Delete)

// rotas tabela itens carrinho
router.post("/itens-carrinho", itens_carrinhoController.InsertItem)
router.get("/itens-carrinho/:carrinhoId", itens_carrinhoController.SearchByCarrinho)
router.put("/itens-carrinho/:carrinhoId/:produtoId", itens_carrinhoController.UpdateQtd)
router.delete("/itens-carrinho/:carrinhoId/:produtoId", itens_carrinhoController.DeleteItem)

module.exports = router;
