import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Button from "../../components/form/Button";
import Modal from "../../components/Modal";

import CadProdutos from "../CadProdutos";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import SearchBar from "../../components/layout/SearchBar";
import { Confirm } from 'react-admin'

const GerenciarProdutos = () => {
  const [isModalProdutoOpen, setIsModalProdutoOpen] = useState(false);

  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);

  const [produtos, setProdutos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false)
  const [idRemove, setIdRemove] = useState(null)
  const [imgRemove, setImgRemove] = useState(null)
  const [error, setError] = useState("")

  const { loading, setLoading, produtosFiltrados, setProdutosFiltrados } = useContext(SearchContext);

  const handleClick = (produtoId, imagem) => {
    setOpenDialog(true)
    setImgRemove(imagem)
    setIdRemove(produtoId)
  }
  const handleDialogClose = () => setOpenDialog(false);

  const openModalProduto = (tipo, produto = null) => {
    setProdutoEmEdicao(produto);
    setIsModalProdutoOpen(true);
  };


  const closeModal = () => {
    setIsModalProdutoOpen(false);
    setProdutoEmEdicao(null);
  };

  const handleExcluirProduto = async (id, imagem_prod) => {
    console.log(imagem_prod);
    try {
      await axios.delete(`http://localhost:3003/sistema/produtos/${id}`);

      await axios.post(`http://localhost:3003/sistema/produtos/delete-image`, { imageUrl: imagem_prod });

      fetchProdutos()
    } catch (err) {
      console.error(err);
      setError(err.response.data.message)
    }
    finally {
      handleDialogClose()
    }
  };
  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3003/sistema/produtos");
      setProdutos(response.data);
      setProdutosFiltrados(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    fetchProdutos();
    setLoading(false);
  }, [isModalProdutoOpen, openDialog]);

  return (
    (loading && <Loading />) || (
      <div className="flex flex-col container mx-auto p-4 items-center justify-center">
        <Confirm
          isOpen={openDialog}
          title={`Deletar produto?`}
          content="Tem certeza que deseja deletar este produto?"
          onConfirm={() => handleExcluirProduto(idRemove, imgRemove)}
          onClose={handleDialogClose}
          confirm={"Deletar"}
          cancel={"Cancelar"}
        />
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Gerenciamento de Produtos</h1>

        <div className="flex space-x-4 mb-6">
          <Button Text="Cadastrar Produto" onClick={openModalProduto} />
        </div>
        <div className="flex space-x-4 mb-6">
          <SearchBar />
        </div>

        <div>
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">PRODUTOS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Nome</th>
                      <th className="p-4 text-left">Descrição</th>
                      <th className="p-4 text-left">Preço</th>
                      <th className="p-4 text-left">Categoria</th>
                      <th className="p-4 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {produtosFiltrados.map((produto) => (
                      <tr key={produto.id} className="border-b hover:bg-gray-100">
                        <td className="p-4">{produto.id}</td>
                        <td className="p-4">{produto.nome_prod}</td>
                        <td className="p-4">{produto.descricao_prod}</td>
                        <td className="p-4">{produto.preco_prod}</td>
                        <td className="p-4">{produto.categoria.nome_categoria}</td>
                        <td className="p-4 flex space-x-2">
                          <Button
                            Text="Editar"
                            onClick={() => openModalProduto("editar", produto)}
                          />
                          <Button
                            Text="Excluir"
                            onClick={() => handleClick(produto.id, produto.imagem_prod)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && <label className="block mb-2 text-red-500">{error}</label>}

        <Modal isOpen={isModalProdutoOpen} onClose={closeModal}>
          <CadProdutos onClose={closeModal} produto={produtoEmEdicao} />
        </Modal>
      </div>

    )
  );
};

export default GerenciarProdutos
