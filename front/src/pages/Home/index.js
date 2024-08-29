import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from '../../components/form/Button'

import Loading from "../../components/Loading";

import { SearchContext } from "../../contexts/SearchContext";

const Home = () => {
  const { produtos, setProdutos, loading, setLoading } =
    useContext(SearchContext);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/sistema/produtos"
        );
        setProdutos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProdutos();
    setLoading(false);
  }, []);

  function toBRL(preco) {
    return preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    (loading && <Loading />) || (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-20">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-4 rounded-lg shadow-md">
            <Link to={`/produto/${produto.id}`}>
              <img
                src={produto.imagem_prod}
                alt={produto.nome_prod}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <div className="p-4">
                <h1 className="text-lg font-bold">{produto.nome_prod}</h1>
                <h2 className="text-muted-foreground text-sm line-clamp-2 text-gray-500">{produto.descricao_prod}</h2>
                <span className="font-bold">
                  {toBRL(produto.preco_prod)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
  );
};

export default Home;