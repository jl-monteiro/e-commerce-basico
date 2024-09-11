const Categoria = require("../models/categoria")

const CategoriaController = {
    async SearchAll(req, res) {
        try {
            const categorias = await Categoria.findAll()
            res.status(200).json(categorias)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    async SearchOne(req, res) {
        try {
            const { id } = req.params
            const categoria = await Categoria.findByPk(id)
            if (categoria) {
                res.status(200).json(categoria)
            }
            else {
                res.status(404).json({ message: "Cidade não encontrada" })
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    async Insert(req, res) {
        try {
            const { nome_categoria } = req.body

            const categoria = await Categoria.create({
                nome_categoria
            })
            res.status(201).json(categoria)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    async Update(req, res) {
        try {
            const { id } = req.params
            const { nome_categoria } = req.body
            const categoria = await Categoria.findByPk(id)
            if (categoria) {
                await categoria.update({
                    nome_categoria
                })
                res.status(200).json(categoria)
            }
            else {
                res.status(404).json({ message: "Categoria não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    },
    async Delete(req, res) {
        try {
            const { id } = req.params
            const categoria = await Categoria.findByPk(id)
            if (categoria) {
                await categoria.destroy()
                res.status(204).send()
            }
            else {
                res.status(404).json({ message: "Endereco não encontrado" });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = CategoriaController