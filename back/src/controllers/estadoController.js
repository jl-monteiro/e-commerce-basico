const Estado = require("../models/estado");

const EstadoController = {
  async SearchAll(req, res) {
    try {
      const estados = await Estado.findAll();
      res.status(200).json(estados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async SearchOne(req, res) {
    try {
      const { id } = req.params;
      const estado = await Estado.findByPk(id);
      if (estado) {
        res.status(200).json(estado);
      } else {
        res.status(404).json({ message: "Estado não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async Update(req, res) {
    res.status(405).json({ message: "Método não permitido para este recurso" });
  },

  async Delete(req, res) {
    res.status(405).json({ message: "Método não permitido para este recurso" });
  },
};

module.exports = EstadoController;
