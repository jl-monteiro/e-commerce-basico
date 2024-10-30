import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import Endereco from "../Endereco";

import { FaRegUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { Confirm } from 'react-admin'

import Alerta from "../../components/Alerta";

const User = () => {
  const { user } = useAuth();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const [enderecos, setEnderecos] = useState([])

  const [editando, setEditando] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enderecoEmEdicao, setEnderecoEmEdicao] = useState(null)

  const [openDialog, setOpenDialog] = useState(false)
  const [idRemove, setIdRemove] = useState(null)

  const [error, setError] = useState("")

  const { loading, setLoading } = useContext(SearchContext);

  const [msg, setMsg] = useState("")
  const [msgShow, setMsgShow] = useState(false)

  const openModal = (tipo, endereco = null) => {
    setEnderecoEmEdicao(endereco)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEnderecoEmEdicao(null)
  };

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setLogin(user.login);
      setEmail(user.email);
    }
    fetchEndereco()
    setLoading(false);
  }, [user, isModalOpen]);

  const handleSave = () => {
    axios
      .put(`http://localhost:3003/sistema/usuarios/${user.id}`, {
        nome,
        login,
        email,
      })
      .then(() => {
        setEditando(false);
        setMsg("Dados atualizados com sucesso.")
        setMsgShow(true)
      })
      .catch((error) => {
        console.error(error);
        setError("Erro ao atualizar os dados. Tente outro dado ou mais tarde.")
      });
  };

  const handleExcluirEndereco = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/sistema/enderecos/${id}`)
      fetchEndereco()
    }
    catch (error) {
      console.error(error)
    }
    finally {
      handleDialogClose()
    }
  }

  const handleClick = (enderId) => {
    setOpenDialog(true)
    setIdRemove(enderId)
  }
  const handleDialogClose = () => setOpenDialog(false);

  const fetchEndereco = async () => {
    const resEndereco = await axios.get(`http://localhost:3003/sistema/enderecos/usuario/${user.id}`)
    const endereco = resEndereco.data.enderecos;
    setEnderecos(endereco)
  }

  return (
    (loading && <Loading />) || (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Alerta msg={msg} msgShow={msgShow} setMsgShow={setMsgShow} />

        <Confirm
          isOpen={openDialog}
          title={`Deletar endereco?`}
          content="Tem certeza que deseja deletar este endereco?"
          onConfirm={() => handleExcluirEndereco(idRemove)}
          onClose={handleDialogClose}
          confirm={"Deletar"}
          cancel={"Cancelar"}
        />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold">Olá, {user.nome}</h1>
              </div>
              <div className="border-b pb-4 mb-6">
                <h2 className="text-xl font-semibold">Perfil</h2>
                <p className="text-sm text-gray-600">
                  Atualize suas informações pessoais.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <FaRegUserCircle size="50px" />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    placeholder="Nome do usuário"
                    value={nome}
                    onChange={(e) => [
                      setNome(e.target.value),
                      setEditando(true),
                    ]}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="login"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Login
                  </label>
                  <input
                    id="login"
                    type="text"
                    placeholder="Login do usuário"
                    value={login}
                    onChange={(e) => [
                      setLogin(e.target.value),
                      setEditando(true),
                    ]}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email do usuário"
                    value={email}
                    onChange={(e) => [
                      setEmail(e.target.value),
                      setEditando(true),
                    ]}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                {user.tipo === "admin" && (
                  <label className="text-sm text-gray-700">Admin</label>
                )}
              </div>

              <div
                className={`mt-6 text-center transition-opacity duration-300 ${editando ? "opacity-100" : "opacity-0"
                  }`}
              >
                <button
                  onClick={handleSave}
                  className="relative px-6 py-3 bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <span className="absolute inset-0 bg-blue-700 opacity-30 rounded-md"></span>
                  <span className="relative">Salvar</span>
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}

              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="border rounded-lg p-6 bg-white shadow-md">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold">Endereços</h2>
                <p className="text-sm text-gray-600">Gerencie seus endereços</p>
              </div>
              <div className="grid gap-4">
                {enderecos.map((endereco) => (
                  <div key={endereco.id} className="grid gap-2">
                    <div className="flex items-center justify-between ">
                      <h3 className="text-lg font-medium">
                        {endereco.logradouro}
                      </h3>
                      <div className="flex gap-4 items-end justify-end">
                        <button
                          className="px-4 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => openModal("editar", endereco)}>
                          Editar
                        </button>
                        <button
                          className="px-2 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => handleClick(endereco.id)}>
                          <FaTrash />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500">{endereco.estado.nome_estado}, {endereco.cidade.nome_cidade}, {endereco.bairro}, {endereco.logradouro}, {endereco.numero}, {endereco.complemento}, {endereco.cep}</p>
                  </div>
                ))}
                <button
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                  onClick={openModal}
                >
                  Adicionar novo endereço
                </button>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Endereco onClose={closeModal} endereco={enderecoEmEdicao} />
        </Modal>
      </div>
    )
  );
};

export default User;
