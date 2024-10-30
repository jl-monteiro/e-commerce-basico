const Carrinho = require('../models/carrinho');
const Pedidos = require('../models/pedidos');

const pedidosController = {
    async Insert(req, res) {
        try {
            const { carrinhoId } = req.body;

            const pedido = await Pedidos.create({
                carrinhoId
            });
            res.status(201).json(pedido);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir pedido", details: error.message });
        }
    },

    async SearchAll(req, res) {
        try {
            const pedidos = await Pedidos.findAll({
                include: [Carrinho]
            });
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pedidos", details: error.message });
        }
    },

    async SearchOne(req, res) {
        try {
            const { carrinhoId } = req.params;

            const pedido = await Pedidos.findOne({
                where: { carrinhoId },
                include: [Carrinho]
            }); 
            if (pedido) {
                res.status(200).json(pedido);
            } else {
                res.status(404).json({ message: "Pedido não encontrado para o carrinhoId fornecido" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao procurar pedido", details: error.message });
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;

            const pedido = await Pedidos.findByPk(id);
            if (pedido) {
                await pedido.destroy();
                res.status(200).json({ message: "Pedido deletado com sucesso" });
            } else {
                res.status(404).json({ message: "Pedido não encontrado para deletar" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar pedido", details: error.message });
        }
    }
};

module.exports = pedidosController;
