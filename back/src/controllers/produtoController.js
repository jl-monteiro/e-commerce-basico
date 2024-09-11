const { Produto, Categoria } = require("../models/relacoes");
const status = require("http-status");
const { Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

exports.Insert = async (req, res, next) => {
  if (req.file) {
    const nome_prod = req.body.nome_prod;
    const descricao_prod = req.body.descricao_prod;
    const preco_prod = req.body.preco_prod;
    const imagem_prod = req.file.filename;
    const categoriaId = req.body.categoriaId

    await Produto.create({
      nome_prod: nome_prod,
      descricao_prod: descricao_prod,
      preco_prod: preco_prod,
      imagem_prod: imagem_prod,
      categoriaId: categoriaId,
    })
      .then((produto) => {
        if (produto) {
          res.status(status.OK).json({
            erro: false,
            mensagem: "Upload realizado com sucesso!",
            produto: produto,
          });
        } else {
          res.status(status.NOT_FOUND).send();
        }
      })
      .catch((error) => next(error));
  } else {
    res.status(400).json({
      erro: true,
      mensagem: "Erro: Upload nao realizado, formato de arquivo invalido.",
    });
  }
};

exports.SearchAll = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;

    const whereCondition = searchQuery
      ? {
        nome_prod: {
          [Op.like]: `%${searchQuery}%`,
        },
      }
      : {};

    const produtos = await Produto.findAll({
      where: whereCondition,
      include: [{
        model: Categoria,
        as: 'Categoria',
      }],
    });

    const produtosUrl = produtos.map((produto) => ({
      id: produto.id,
      nome_prod: produto.nome_prod,
      descricao_prod: produto.descricao_prod,
      preco_prod: produto.preco_prod,
      imagem_prod: `http://localhost:3003/sistema/produtos/files/users/${produto.imagem_prod}`,
      categoriaId: produto.categoriaId,
      categoria: produto.Categoria,
      createdAt: produto.createdAt,
      updatedAt: produto.updatedAt,
    }));

    res.status(status.OK).json(produtosUrl);
  } catch (error) {
    next(error);
  }
};


exports.SearchOne = (req, res, next) => {
  const id = req.params.id;

  Produto.findByPk(id, {
    include: [{
      model: Categoria,
      as: 'Categoria',
    }]
  })
    .then((produto) => {
      const produtoUrl = {
        id: produto.id,
        nome_prod: produto.nome_prod,
        descricao_prod: produto.descricao_prod,
        preco_prod: produto.preco_prod,
        imagem_prod: `http://localhost:3003/sistema/produtos/files/users/${produto.imagem_prod}`,
        categoriaId: produto.categoriaId,
        categoria: produto.Categoria,
        createdAt: produto.createdAt,
        updatedAt: produto.updatedAt,
      };

      res.status(status.OK).send(produtoUrl);
    })
    .catch((error) => next(error));
};

exports.Update = (req, res, next) => {
  const id = req.params.id;
  const nome_prod = req.body.nome_prod;
  const descricao_prod = req.body.descricao_prod;
  const preco_prod = req.body.preco_prod;
  const imagem_prod = req.file.filename
  const categoriaId = req.body.categoriaId
  Produto.findByPk(id)
    .then((produto) => {
      if (produto) {
        produto
          .update(
            {
              nome_prod: nome_prod,
              descricao_prod: descricao_prod,
              preco_prod: preco_prod,
              imagem_prod: imagem_prod,
              categoriaId: categoriaId
            },
            {
              where: { id: id },
            }
          )
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => next(error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.Delete = (req, res, next) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then((produto) => {
      if (produto) {
        produto
          .destroy({
            where: { id: id },
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => next(error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.DeleteImg = (req, res) => {
  const { imageUrl } = req.body;

  const imagePath = imageUrl.replace(
    "http://localhost:3003/sistema/produtos/files/users",
    ""
  );
  const fullPath = path.join(__dirname, "../../public/upload/users", imagePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Erro ao deletar imagem no back" });
    }
    res.status(200).json({ message: "Imagem deletada com sucesso." });
  });
};
