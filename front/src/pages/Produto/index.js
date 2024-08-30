import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "../../components/form/Button";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";

import Alerta from "../../components/Alerta";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [msg, setMsg] = useState("")
  const [msgShow, setMsgShow] = useState(false)

  const { loading, setLoading, addCarrinho } = useContext(SearchContext);

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
    return parseInt(preco).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleAddCarrinho = (id, produto) => {
    addCarrinho(id, produto)
    setMsg("Adicionado ao carrinho com sucesso.")
    setMsgShow(true)
  }

  return (
    (loading && <Loading />) || (
      <div className="bg-background">

        <Alerta msg={msg} msgShow={msgShow} setMsgShow={setMsgShow} />

        <section className="grid md:grid-cols-2 gap-8 px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
          <div className="flex flex-col gap-6">
            <img
              src={produto.imagem_prod}
              alt={produto.nome_prod}
              width={600}
              height={600}
              className="rounded-lg object-none w-full aspect-square "
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
                <p className="text-4xl font-bold">{toBRL(produto.preco_prod)}</p>
              </div>
              <Button
                Text="Adicionar ao carrinho"
                onClick={() => (handleAddCarrinho(id, produto))}
              />
            </div>
          </div>
        </section>
      </div>
    )
  );
};

export default Produto;