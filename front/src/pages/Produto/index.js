import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Button from "../../components/form/Button";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import { Carousel } from 'primereact/carousel';

import Alerta from "../../components/Alerta";
import useAuth from "../../hooks/useAuth";
import Carrinho from "../../components/Carrinho";
import Modal from "../../components/Modal";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [msg, setMsg] = useState("")
  const [msgShow, setMsgShow] = useState(false)
  const [carrinhoId, setCarrinhoId] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { user } = useAuth()

  const { loading, setLoading, addCarrinho, produtos, setProdutos } = useContext(SearchContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
    fetchProdutos()
    setLoading(false);
  }, [id]);


  useEffect(() => {
    const fetchCarrinho = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:3003/sistema/carrinho/${user.id}`)
          let data = response.data
          setCarrinhoId(data[data.length - 1].id)
        }
        catch (error) {
          if (error.response && error.response.status === 404) {
            try {
              const response = await axios.post("http://localhost:3003/sistema/carrinho", { usuarioId: user.id })
              console.log("carrinho criado: ", response.data)
              setCarrinhoId(response.data.id)

            }
            catch (postError) {
              console.error("Erro ao criar carrinho: ", postError)
            }
          }
        }
      }
    }
    fetchCarrinho()
  }, [user]);

  function toBRL(preco) {
    return parseInt(preco).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleAddCarrinho = (id, carrinhoId) => {
    addCarrinho(parseInt(id), carrinhoId)
    setMsg("Adicionado ao carrinho com sucesso.")
    setMsgShow(true)
    openModal()
  }

  const responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const produtoTemplate = (produto) => {
    return (
      <div key={produto.id} className="p-5">
        <Card className="">
          <Link to={`/produto/${produto.id}`} key={produto.id}>
            <CardHeader className="p-0 bg-white ">
              <img
                src={produto.imagem_prod}
                alt={produto.nome_prod}
                className="w-full h-48 object-contain rounded-t-lg "
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-gray-800">{produto.nome_prod}</CardTitle>
              <CardDescription className="text-gray-600 line-clamp-1">
                {produto.descricao_prod}
              </CardDescription>
            </CardContent>
          </Link>
          <CardFooter className="flex justify-between items-center bg-white">
            <span className="text-sm font-bold text-blue-600">{toBRL(produto.preco_prod)}</span>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    (loading && <Loading />) || (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <Alerta msg={msg} msgShow={msgShow} setMsgShow={setMsgShow} />
        <div className="max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <img
              src={produto.imagem_prod}
              alt={produto.nome_prod}
              className="w-full md:w-1/2 object-none h-96"
            />
            <div className="p-6 flex flex-col justify-between">
              <h1 className="text-3xl font-bold text-gray-800">{produto.nome_prod}</h1>
              <p className="text-gray-600 mt-2">{produto.descricao_prod}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-2xl font-bold text-blue-600">{toBRL(produto.preco_prod)}</p>
                <Button
                  Text="Adicionar ao carrinho"
                  onClick={() => handleAddCarrinho(id, carrinhoId)}
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-2xl font-semibold">Produtos similiares</h1>
        <Carousel
          value={produtos.filter(produtoLista => produtoLista.categoriaId === produto.categoriaId)}
          numVisible={5}
          numScroll={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={produtoTemplate}
        />
        
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Carrinho onClose={closeModal} />
        </Modal>
      </div>
    )
  );
};

export default Produto;