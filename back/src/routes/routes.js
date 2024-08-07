const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/usuarioController')
const ProdutoController = require('../controllers/produtoController')
const uploadUser = require('../../middlewares/uploadImg')

//rotas da tabela usuarios
router.post('/usuarios', UsuarioController.Insert)
router.get('/usuarios', UsuarioController.SearchAll)
router.get('/usuarios/:id', UsuarioController.SearchOne)
router.put('/usuarios/:id', UsuarioController.Update)
router.delete('/usuarios/:id', UsuarioController.Delete)

//rotas da tabela produto
router.post('/produtos', uploadUser.single('image'), ProdutoController.Insert)
router.get('/produtos', ProdutoController.SearchAll)
router.get('/produtos/:id', ProdutoController.SearchOne)
router.put('/produtos/:id', uploadUser.single('image'), ProdutoController.Update)
router.delete('/produtos/:id', ProdutoController.Delete)


module.exports = router