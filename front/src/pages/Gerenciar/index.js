import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from "../../components/form/Button";
import Modal from "../../components/Modal";

import CadProdutos from "../CadProdutos";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import CadCategoria from "../CadCategoria";

const Gerenciar = () => {
  const [isModalProdutoOpen, setIsModalProdutoOpen] = useState(false);
  const [isModalCategoriaOpen, setIsModalCategoriaOpen] = useState(false);

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([])

  const { loading, setLoading } = useContext(SearchContext);

  const openModalProduto = (tipo, produto = null) => {
    setProdutoEmEdicao(produto);
    setIsModalProdutoOpen(true);
  };

  const openModalCategoria = (tipo, categoria = null) => {
    setCategoriaEmEdicao(categoria)
    setIsModalCategoriaOpen(true)
  }

  const closeModal = () => {
    setIsModalProdutoOpen(false);
    setIsModalCategoriaOpen(false)
    setProdutoEmEdicao(null);
  };

  const handleExcluirProduto = async (id, imagem_prod) => {
    console.log(imagem_prod);
    try {
      const rsp = await axios.post(
        `http://localhost:3003/sistema/produtos/delete-image`,
        { imageUrl: imagem_prod }
      );
      console.log(rsp);
      await axios.delete(`http://localhost:3003/sistema/produtos/${id}`);
      const response = await axios.get(
        "http://localhost:3003/sistema/produtos"
      );
      setProdutos(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExcluirCategoria = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/sistema/categorias/${id}`)
      const response = await axios.get(
        "http://localhost:3003/sistema/categorias"
      );
      setCategorias(response.data);
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:3003/sistema/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:3003/sistema/categorias")
        setCategorias(response.data)
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchCategorias()
    fetchProdutos();
    setLoading(false);
  }, [isModalProdutoOpen]);

  return (
    (loading && <Loading />) || (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos e Categoria</h1>

        <div className="flex space-x-4 mb-6">
          <Button Text="Cadastrar Produto" onClick={openModalProduto} />
          <Button Text="Cadastrar Categoria" onClick={openModalCategoria} />
        </div>

        <div className="flex flex-wrap justify-center space-x-8">
          {/* CRUD PRODUTOS */}
          <div className="w-full max-w-4xl">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Nome</th>
                  <th className="p-4 text-left">Descricao</th>
                  <th className="p-4 text-left">Preco</th>
                  <th className="p-4 text-left">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id} className="border-b">
                    <td className="p-4">{produto.nome_prod}</td>
                    <td className="p-4">{produto.descricao_prod}</td>
                    <td className="p-4">{produto.preco_prod}</td>
                    <td className="p-4 flex space-x-2">
                      <Button
                        Text="Editar"
                        onClick={() => openModalProduto("editar", produto)}
                      />
                      <Button
                        Text="Excluir"
                        onClick={() =>
                          handleExcluirProduto(produto.id, produto.imagem_prod)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CRUD CATEGORIAS */}
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Nome</th>
                  <th className="p-4 text-left">Descricao</th>
                  <th className="p-4 text-left">Preco</th>
                  <th className="p-4 text-left">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id} className="border-b">
                    <td className="p-4">{categoria.nome_categoria}</td>
                    <td className="p-4 flex space-x-2">
                      <Button
                        Text="Editar"
                        onClick={() => openModalCategoria("editar", categoria)}
                      />
                      <Button
                        Text="Excluir"
                        onClick={() =>
                          handleExcluirCategoria(categoria.id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Modal isOpen={isModalProdutoOpen} onClose={closeModal}>
          <CadProdutos onClose={closeModal} produto={produtoEmEdicao} />
        </Modal>
        <Modal isOpen={isModalCategoriaOpen} onClose={closeModal}>
          <CadCategoria onClose={closeModal} produto={produtoEmEdicao} />
        </Modal>
      </div>
    )
  );
};

export default Gerenciar
