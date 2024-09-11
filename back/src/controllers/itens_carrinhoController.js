const Produto = require('../models/produto')
const Carrinho = require('../models/carrinho')
const Itens_carrinho = require('../models/itens_carrinho')

const itens_carrinhoController = {
    async InsertItem(req, res) {
        try {
            const { carrinhoId, produtoId, qtd } = req.body

            const item_carrinho = await Itens_carrinho.create({
                carrinhoId,
                produtoId,
                qtd
            })
            res.status(201).json(item_carrinho)
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao inserir item: ", error })
        }
    },
    async UpdateQtd(req, res) {
        try {
            const { qtd, carrinhoId, produtoId } = req.body

            const item_carrinho = await Itens_carrinho.findOne({ where: { carrinhoId, produtoId } })
            if (item_carrinho) {
                await item_carrinho.update({
                    qtd
                })
                res.status(200).json(item_carrinho)
            }
            else {
                res.status(404).json({ message: "Item nao encontrado update " })
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao atualizar quantidade: ", error })
        }
    },

    async SearchByCarrinho(req, res) {
        try {
            const { carrinhoId } = req.params

            const item_carrinho = await Itens_carrinho.findAll({
                where: { carrinhoId: carrinhoId }
            })
            if (item_carrinho) {
                res.status(200).json(item_carrinho)
            }
            else {
                res.status(404).json({ message: "Item nao encontrado search" })
            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao procurar pelo id do carrinho: ", error })
        }
    },



    async DeleteItem(req, res) {
        try {
            const { carrinhoId, produtoId } = req.body

            const item_carrinho = await Itens_carrinho.findOne({ where: { carrinhoId, produtoId } })
            if (item_carrinho) {
                item_carrinho.destroy()
            }
            else {
                res.status(404).json({ message: "Erro ao procurar item para deletar: " })

            }
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao deletar item: ", error })
        }
    }
}

module.exports = itens_carrinhoController