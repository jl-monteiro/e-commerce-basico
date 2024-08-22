const { Endereco, Cidade, Usuario } = require("../models/relacoes");

const EnderecoController = {
  async Insert(req, res) {
    try {
      const {
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidadeId,
        usuarioId,
      } = req.body;

      const endereco = await Endereco.create({
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidadeId,
        usuarioId,
      });
      res.status(201).json(endereco);
    } catch (err) {
      res.status(500).json({ error: err});
    }
  },

  async SearchAll(req, res) {
    try {
      const enderecos = await Endereco.findAll({
        include: [Cidade, Usuario],
      });
      res.status(200).json({ enderecos });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async SearchOne(req, res) {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findByPk(id, {
        include: [Cidade, Usuario],
      });
      if (endereco) {
        res.status(200).json(endereco);
      } else {
        res.status(404).json({ message: "Endereco nao encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async Update(req, res) {
    try {
      const { id } = req.params;
      const {
        logradouro,
        numero,
        complemento,
        bairro,
        cep,
        cidadeId,
        usuarioId,
      } = req.body;
      const endereco = await Endereco.findByPk(id);
      if (endereco) {
        await endereco.update({
          logradouro,
          numero,
          complemento,
          bairro,
          cep,
          cidadeId,
          usuarioId,
        });
        res.status(200).json(endereco);
      } else {
        res.status(404).json({ message: "Endereco não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async Delete(req, res) {
    try {
      const { id } = req.params;
      const endereco = await Endereco.findByPk(id);
      if (endereco) {
        await endereco.destroy();
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Endereco não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = EnderecoController;
