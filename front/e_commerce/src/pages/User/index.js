import React, { useEffect, useState } from "react";
import UserInfo from "../../services/UserInfo";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const userInfo = UserInfo();
  const { deslogar } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setNome(userInfo.nome);
      setLogin(userInfo.login);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSave = () => {
    axios
      .put(`http://localhost:3003/sistema/usuarios/${userInfo.id}`, {
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

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Olá, {userInfo.nome}</h1>
        </div>

        <div>
          <label htmlFor="nome" className="block mb-2">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            placeholder="Nome do usuário"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setEditando(true)]}
            className="w-full p-2 border rounded mb-4"
          />

          <label htmlFor="login" className="block mb-2">
            Login:
          </label>
          <input
            type="text"
            id="login"
            placeholder="Login do usuário"
            value={login}
            onChange={(e) => [setLogin(e.target.value), setEditando(true)]}
            className="w-full p-2 border rounded mb-4"
          />

          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setEditando(true)]}
            className="w-full p-2 border rounded mb-4"
          />
          {userInfo.tipo === "admin" && <label>admin</label>}
        </div>

        {editando && (
          <div className="text-center">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Salvar
            </button>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <button
          onClick={() => [deslogar(), navigate("/")]}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default User;
