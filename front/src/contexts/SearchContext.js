import React, { createContext, useState, useEffect } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()

  const addCarrinho = async (id, carrinhoId) => {
    if (!carrinhoId) {
      console.error("Carrinho ID não está definido");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}`)
      const qtd = response.data.qtd
      const newQtd = qtd + 1
      await axios.put("http://localhost:3003/sistema/itens-carrinho", { qtd: newQtd, carrinhoId, produtoId: id })

    }
    catch (error) {
      const response = await axios.post("http://localhost:3003/sistema/itens-carrinho", { carrinhoId: carrinhoId, produtoId: id, qtd: 1 })
      console.log(response.data)
      console.log("CARRINHO ID: ", carrinhoId)
    }
  };

  const value = {
    produtos,
    setProdutos,
    loading,
    setLoading,
    addCarrinho,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: propTypes.any,
};
