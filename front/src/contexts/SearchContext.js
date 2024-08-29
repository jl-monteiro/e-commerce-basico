import React, { createContext, useState, useEffect } from "react";
import propTypes from "prop-types";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState([])

  const addCarrinho = (id, produto) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtoCarrinho = carrinho.findIndex((prod) => prod.id === id);

    if (produtoCarrinho > -1) {
      carrinho[produtoCarrinho].qtd += 1;
    } else {
      carrinho.push({
        id: id,
        nome_prod: produto.nome_prod,
        preco_prod: produto.preco_prod,
        imagem_prod: produto.imagem_prod,
        qtd: 1,
      });
    }
    setCarrinho(carrinho)
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  };

  useEffect(() => {
    const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho"));
    setCarrinho(carrinhoStorage || []);
  }, []);

  const value = {
    produtos,
    setProdutos,
    loading,
    setLoading,
    carrinho,
    setCarrinho,
    addCarrinho,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: propTypes.any,
};
