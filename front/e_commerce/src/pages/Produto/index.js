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
    setLoading(false);
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
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    console.log(carrinho);
  };

  function toBRL(preco) {
    return preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    (loading && <Loading />) || (
      <div className="bg-background">
        <section className="grid md:grid-cols-2 gap-8 px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <img
              src={produto.imagem_prod}
              alt={produto.nome_prod}
              width={600}
              height={600}
              className="rounded-lg object-cover w-full aspect-square"
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                {produto.nome_prod}
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground text-base">
                {produto.descricao_prod}
              </p>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-bold">R$ {produto.preco_prod}</p>
                <Button
                  Text="Adicionar ao carrinho"
                  size="lg"
                  onClick={addCarrinho}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default Produto;
