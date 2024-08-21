import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../contexts/SearchContext";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import Endereco from "../Endereco";

import { FaRegUserCircle } from "react-icons/fa";

const User = () => {
  const { deslogar, user } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [editando, setEditando] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { loading, setLoading } = useContext(SearchContext);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setLogin(user.login);
      setEmail(user.email);
    }
    setLoading(false);
  }, [user]);

  const handleSave = () => {
    axios
      .put(`http://localhost:3003/sistema/usuarios/${user.id}`, {
        nome,
        login,
        email,
      })
      .then((response) => {
        setEditando(false);
        alert("Dados atualizados com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao atualizar os dados.");
      });
  };

  if (!user) {
    return <Loading />;
  }

  return (
    (loading && <Loading />) || (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className={`mt-6 text-center transition-opacity duration-300 ${
                  editando ? "opacity-100" : "opacity-0"
                }`}
              >
                <button
                  onClick={handleSave}
                  className="relative px-6 py-3 bg-blue-500 text-white rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <span className="absolute inset-0 bg-blue-700 opacity-30 rounded-md"></span>
                  <span className="relative">Salvar</span>
                </button>
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
                {/* enderecos map*/}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      tipos de endereco (casa, comercial, residencial sla)
                    </h3>
                    <button className="px-4 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50">
                      Editar
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">endereco completo</p>
                </div>

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
        <div className="text-center mt-4">
          <button
            onClick={() => [deslogar(), navigate("/login")]}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Sair
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <Endereco onClose={closeModal} />
        </Modal>
      </div>
    )
  );
};

export default User;
