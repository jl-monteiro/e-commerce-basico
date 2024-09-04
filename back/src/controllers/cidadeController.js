const { Cidade, Estado } = require('../models/relacoes')

const CidadeController = {
  async SearchAll(req, res) {
    try {
      const cidades = await Cidade.findAll({
        include: [Estado],
      });
      res.status(200).json(cidades);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async SearchOne(req, res) {
    try {
      const { id } = req.params;
      const cidade = await Cidade.findByPk(id, {
        include: [Estado],
      });
      if (cidade) {
        res.status(200).json(cidade);
      } else {
        res.status(404).json({ message: "Cidade não encontrada" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = CidadeController;
