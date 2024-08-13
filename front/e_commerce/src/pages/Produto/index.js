import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "../../components/form/Button";
import { SearchContext } from "../../contexts/SearchContext";
import { useContext } from "react";
import Loading from "../../components/Loading";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const { loading, setLoading } = useContext(SearchContext);

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
    setLoading(false)
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

  const addCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produtoCarrinho = carrinho.findIndex(prod => prod.id === id);

    if (produtoCarrinho > -1) {
      carrinho[produtoCarrinho].qtd += 1
    }
    else{
      carrinho.push({
        id: id,
        nome_prod: produto.nome_prod,
        preco_prod: produto.preco_prod,
        imagem_prod: produto.imagem_prod,
        qtd: 1,
      })
    }
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    console.log(carrinho);
  }

  return (
    (loading && <Loading />) ||
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

              <Button
                Text="Adicionar ao Carrinho"
                onClick={addCarrinho}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produto;
