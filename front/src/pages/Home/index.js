import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from '../../components/form/Button'

import Loading from "../../components/Loading";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Alerta from "../../components/Alerta";

import { SearchContext } from "../../contexts/SearchContext";
import useAuth from "../../hooks/useAuth.js";

const Home = () => {
  const { produtos, setProdutos, loading, setLoading, addCarrinho, carrinho, carrinhoId } = useContext(SearchContext);
  const { user } = useAuth()

  const [msg, setMsg] = useState("")
  const [msgShow, setMsgShow] = useState(false)

  const [showFiltro, setShowFiltro] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState("")
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([])
  const [produtosOriginais, setProdutosOriginais] = useState([])

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
      setProdutosOriginais(response.data)
      setProdutos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setCategoriasSelecionadas((prev) => [...prev, value]);
    } else {
      setCategoriasSelecionadas((prev) => prev.filter(id => id !== value));
    }
  }

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

  const handleAddCarrinho = (id, carrinhoId) => {
    addCarrinho(id, carrinhoId)
    setMsg("Adicionado ao carrinho com sucesso.")
    setMsgShow(true)
  }

  const aplicarFiltros = () => {
    if (categoriasSelecionadas.length === 0) {
      setProdutos(produtosOriginais);
    } else {
      const produtosFiltrados = produtosOriginais.filter(produto =>
        categoriasSelecionadas.includes(produto.categoriaId.toString())
      );
      setProdutos(produtosFiltrados);
    }
  };

  const MapProdutos = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produtos.map((produto) => (
          <div key={produto.id}>
            <Card className="hover:shadow-lg transition-transform duration-300 hover:scale-105">
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
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm font-bold text-blue-600">{toBRL(produto.preco_prod)}</span>
                {user && (
                  <Button Text={"Adicionar ao Carrinho"} className={""} variant="black" onClick={() => (handleAddCarrinho(produto.id, carrinhoId))} />
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    )
  }

  const BemVindo = () => {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-800 via-black to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Bem-vindo ao JL-Commerce
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl text-gray-400">
                Um lugar onde suas compras se tornam uma experiência única.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const Filtragem = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Button Text="Fechar filtros" variant="black" onClick={() => setShowFiltro(false)} />
        <h3 className="text-lg font-semibold mt-4 mb-2">Categorias</h3>
        <div className="flex flex-col space-y-2">
          {categorias.map((categoria) => (
            <label key={categoria.id} className={`flex items-center p-2 rounded transition-colors duration-200 ${categoriasSelecionadas.includes(categoria.id.toString()) ? 'bg-blue-100' : ''}`}>
              <input
                type="checkbox"
                value={categoria.id.toString()}
                checked={categoriasSelecionadas.includes(categoria.id.toString())}
                onChange={handleCheckbox}
                className="mr-2"
              />
              {categoria.nome_categoria}
            </label>
          ))}
        </div>

        <Button Text="Aplicar filtros" variant="black" onClick={aplicarFiltros} className="mt-4" />
      </div>
    );
  };


  return (
    (loading && <Loading />) || (
      <div className="flex-1">
        <Alerta msg={msg} msgShow={msgShow} setMsgShow={setMsgShow} />

        <BemVindo />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-gray-800 ">
              Produtos
            </h2>

            {showFiltro ? <Filtragem />
              : <Button Text="Filtros" variant="black" onClick={() => setShowFiltro(true)} />}


            <MapProdutos />
          </div>
        </section>
      </div>

    )
  );
};



export default Home;
