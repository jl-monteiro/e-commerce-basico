import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '../../components/form/Button'
import Loading from "../../components/Loading";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Alerta from "../../components/Alerta";
import { Carousel } from 'primereact/carousel';

import { SearchContext } from "../../contexts/SearchContext";

const Home = () => {
  const { produtos, setProdutos, loading, setLoading } = useContext(SearchContext);
  const [msg, setMsg] = useState("")
  const [msgShow, setMsgShow] = useState(false)

  const [showFiltro, setShowFiltro] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState("")
  const [categoriaSelecionada, setCategoriaSelecionada] = useState({})
  const [produtosFiltrados, setProdutosFiltrados] = useState([])

  const navigate = useNavigate()

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3003/sistema/categorias")
      setCategorias(res.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3003/sistema/produtos"
      );
      setProdutos(response.data);
      setProdutosFiltrados(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategorias()

    fetchProdutos();
    setLoading(false);
  }, []);

  function toBRL(preco) {
    return preco.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
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

  const MapProdutos = () => {
    return (
      <div className="space-y-12">
        {produtosFiltrados.length === produtos.length ? (
          categorias.map((categoria) => (
            <div key={categoria.id}>
              <h3 className="px-10 font-semibold">{categoria.nome_categoria}</h3>
              <Carousel
                value={produtos.filter((produto) => produto.categoriaId === categoria.id)}
                numVisible={4}
                numScroll={2}
                autoplayInterval={8000}
                responsiveOptions={responsiveOptions}
                itemTemplate={produtoTemplate}
              />
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10">
            {produtosFiltrados.map((produto) => (
              <div key={produto.id}>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <Link to={`/produto/${produto.id}`}>
                    <CardHeader className="p-0 bg-white">
                      <img
                        src={produto.imagem_prod}
                        alt={produto.nome_prod}
                        className="w-full h-48 object-contain rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-gray-800">{produto.nome_prod}</CardTitle>
                      <CardDescription className="text-gray-600 line-clamp-2">
                        {produto.descricao_prod}
                      </CardDescription>
                    </CardContent>
                  </Link>
                  <CardFooter className="flex justify-between items-center bg-white">
                    <span className="text-sm font-bold text-blue-600">
                      {toBRL(produto.preco_prod)}
                    </span>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  

  const BemVindo = () => {
    return (
      <section className="w-full py-12 md:py-12 lg:py-16 xl:py-24 bg-gradient-to-r from-gray-800 via-black to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Bem-vindo ao JL-Commerce
              </h1>
              <p className="mx-auto max-w-1xl text-lg md:text-lg text-gray-400">
                Um lugar onde suas compras se tornam uma experiência única.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const handleCategoria = (e) => {
    setCategoriaSelecionada(e.target.value)

    setProdutosFiltrados(
      e.target.value === "todas"
        ? produtos
        : produtos.filter((produto) => e.target.value === produto.categoria.nome_categoria))
  }

  const Categorias = () => {
    return (
      <nav className="flex">
        <ol className="inline-flex items-center ">
          <li aria-current="page">
            <select
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={handleCategoria}
              value={categoriaSelecionada}
            >
              <option value="todas">Todas as categorias</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nome_categoria}>
                  {categoria.nome_categoria}
                </option>
              ))}
            </select>
          </li>
        </ol>
      </nav>
    )
  }

  return (
    (loading && <Loading />) || (
      <div className="flex-1">
        <Alerta msg={msg} msgShow={msgShow} setMsgShow={setMsgShow} />

        <BemVindo />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-800 ">
              Produtos
            </h2>
            <Categorias />

            <MapProdutos />
          </div>
        </section>
      </div>

    )
  );
};

export default Home;
