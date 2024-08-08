import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "../../components/form/Button";
import Modal from "../../components/Modal";

import CadProdutos from "../CadProdutos";

const GerenciaProdutos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
  const [modalTipo, setModalTipo] = useState("adicionar");

  const openModal = (tipo, produto = null) => {
    setModalTipo(tipo);
    setProdutoEmEdicao(produto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Gerenciamento de Produtos</h1>
      <div className="space-x-4">
        <Button Text="Cadastrar Produto" onClick={openModal} />
      </div>

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
                    onClick={() => openModal("editar", produto)}
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CadProdutos onClose={closeModal} produto={produtoEmEdicao} />
      </Modal>
    </div>
  );
};

export default GerenciaProdutos;
