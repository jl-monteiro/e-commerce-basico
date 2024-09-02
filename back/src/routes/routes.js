const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuarioController");
const ProdutoController = require("../controllers/produtoController");
const EnderecoController = require("../controllers/enderecoController");
const EstadoController = require("../controllers/estadoController");
const CidadeController = require("../controllers/cidadeController");
const uploadUser = require("../../middlewares/uploadImg");

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

module.exports = router;
