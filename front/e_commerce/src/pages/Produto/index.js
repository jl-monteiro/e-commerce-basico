import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState({});

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/sistema/produtos/${id}`
        );
        setProduto(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduto();
  }, [id]);

  function toBRL(preco) {
    return (
      preco &&
      preco.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })
    );
  }

  return (
    <div className="antialiased layout-body bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src={produto.imagem_prod}
              alt={produto.nome_prod}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {produto.nome_prod}
            </div>
            <p className="mt-2 text-gray-500">{produto.descricao_prod}</p>
            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">
                {toBRL(produto.preco_prod)}
              </span>
              <button className="ml-4 px-4 py-2 bg-indigo-500 text-white text-sm font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;
