const Produto = require("../models/produto");
const status = require("http-status");

exports.Insert = async (req, res, next) => {
  if (req.file) {
    const nome_prod = req.body.nome_prod;
    const descricao_prod = req.body.descricao_prod;
    const preco_prod = req.body.preco_prod;
    const imagem_prod = req.file.filename;

    await Produto.create({
      nome_prod: nome_prod,
      descricao_prod: descricao_prod,
      preco_prod: preco_prod,
      imagem_prod: imagem_prod,
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

exports.SearchAll = (req, res, next) => {
  Produto.findAll()
    .then((produtos) => {
      const produtosUrl = produtos.map((produto) => ({
        id: produto.id,
        nome_prod: produto.nome_prod,
        descricao_prod: produto.descricao_prod,
        preco_prod: produto.preco_prod,
        imagem_prod: `http://localhost:3003/sistema/produtos/files/users/${produto.imagem_prod}`,
        createdAt: produto.createdAt,
        updatedAt: produto.updatedAt,
      }));

      res.status(status.OK).send(produtosUrl);
    })
    .catch((error) => next(error));
};

exports.SearchOne = (req, res, next) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then((produto) => {
      const produtoUrl = {
        id: produto.id,
        nome_prod: produto.nome_prod,
        descricao_prod: produto.descricao_prod,
        preco_prod: produto.preco_prod,
        imagem_prod: `http://localhost:3003/sistema/produtos/files/users/${produto.imagem_prod}`,
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

  Produto.findByPk(id)
    .then((produto) => {
      if (produto) {
        produto
          .update(
            {
              nome_prod: nome_prod,
              descricao_prod: descricao_prod,
              preco_prod: preco_prod,
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

//upload imagem
