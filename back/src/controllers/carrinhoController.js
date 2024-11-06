const Carrinho = require('../models/carrinho')
const Produto = require('../models/produto')
const Usuario = require('../models/usuario')

const carrinhoController = {
    async Insert(req, res) {
        try {
            const { usuarioId } = req.body

            const carrinho = await Carrinho.create({
                usuarioId
            })
            res.status(201).json(carrinho)
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao inserir carrinho: ", error })
        }
    },
    async SearchCarrinho(req, res) {
        try {
            const { usuarioId } = req.params

            const carrinho = await Carrinho.findAll({ where: { usuarioId: usuarioId } }, { include: [Usuario] })
            if (carrinho) {
                res.status(200).json(carrinho)
            }
            else {
                res.status(404).json({ message: "Carrinho nao encontrado pelo usuarioId" })
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao procurar carrinho: ", error })
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params

            const carrinho = await Carrinho.findByPk(id)
            if (carrinho) {
                carrinho.destroy()
            }
            else {
                res.status(404).json({ message: "Nao encontrado carrinho para deletar" })
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao deletar carrinho: ", error })
        }
    }
}

module.exports = carrinhoController