import React, { createContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([])

  const [loading, setLoading] = useState(true);
  const [carrinhoId, setCarrinhoId] = useState("");
  const [carrinho, setCarrinho] = useState([]);

  const { user } = useAuth()

  const addCarrinho = async (id, carrinhoId) => {
    if (!carrinhoId) {
      console.error("Carrinho ID não está definido");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}`)
      const itens = response.data

      const prodCarrinho = itens.find((item) => item.produtoId === id)

      if (prodCarrinho) {
        const newQtd = prodCarrinho.qtd + 1
        await axios.put(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}/${id}`, { qtd: newQtd })
      }
      else {
        await axios.post("http://localhost:3003/sistema/itens-carrinho", { carrinhoId, produtoId: id, qtd: 1 })

      }

      const updatedItens = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${carrinhoId}`);
      setCarrinho(updatedItens.data);
    }
    catch (error) {
      console.log("CARRINHO ID: ", carrinhoId)
    }
    
  };

  const fetchCarrinho = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:3003/sistema/carrinho/${user.id}`);
        let data = response.data
        setCarrinhoId(data[data.length - 1].id)

        const itens = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${data[data.length - 1].id}`);
        //console.log("Itens do carrinho: ", itens.data);
        setCarrinho(itens.data);
      } catch (error) {
        if (error) {
          try {
            const response = await axios.post("http://localhost:3003/sistema/carrinho", { usuarioId: user.id });
            //console.log("Carrinho criado: ", response.data);
            setCarrinhoId(response.data.id);
          } catch (postError) {
            console.error("Erro ao criar carrinho: ", postError);
          }
        } else {
          console.error("Erro ao buscar carrinho: ", error);
        }
      }
    }
  };

  useEffect(() => {
    fetchCarrinho()
  }, [user])

  const value = {
    produtos,
    setProdutos,
    produtosFiltrados,
    setProdutosFiltrados,
    loading,
    setLoading,
    addCarrinho,
    carrinho,
    setCarrinho,
    carrinhoId,
    setCarrinhoId
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: propTypes.any,
};
