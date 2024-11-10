const Carrinho = require('../models/carrinho');
const Endereco = require('../models/endereco');
const Pedidos = require('../models/pedidos');
const Usuario = require('../models/usuario');

const pedidosController = {
    async Insert(req, res) {
        try {
            const { nome_recebedor, cpf_recebedor, valorTotal, carrinhoId, usuarioId, enderecoId } = req.body;

            const pedido = await Pedidos.create({
                nome_recebedor, cpf_recebedor, valorTotal, carrinhoId, usuarioId, enderecoId
            });
            const carrinho = await Carrinho.create({
                usuarioId
            })
            console.log(pedido)
            res.status(201).json(pedido);
        } catch (error) {
            res.status(500).json({ error: "Erro ao inserir pedido", details: error.message });
        }
    },

    async SearchAll(req, res) {
        try {
            const pedidos = await Pedidos.findAll({
                include: [Carrinho, Usuario, Endereco]
            });
            res.status(200).json(pedidos);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pedidos", details: error.message });
        }
    },
    async SearchByUser(req, res) {
        try {
            const { usuarioId } = req.params;

            const pedido = await Pedidos.findAll({
                where: { usuarioId },
                include: [Carrinho, Usuario, Endereco]
            });
            if (pedido) {
                res.status(200).json(pedido);
            } else {
                res.status(404).json({ message: "Pedido não encontrado para o usuarioId fornecido" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao procurar pedido", details: error.message });
        }
    },
    async SearchUniqueByUser(req, res) {
        try {
            const { usuarioId, id } = req.params;

            const pedido = await Pedidos.findOne({
                where: { id, usuarioId },
                include: [Carrinho, Usuario, Endereco]
            });
            if (pedido) {
                res.status(200).json(pedido);
            } else {
                res.status(404).json({ message: "Pedido não encontrado " });
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
