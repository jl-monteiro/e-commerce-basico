import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

const Registrar = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { registrar } = useAuth();

  const handleRegistra = async () => {
    if (!nome || !login || !email || !emailConf || !senha) {
      setError("Preencha todos os campos.");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não coincidem.");
      return;
    }

    const res = await registrar(nome, login, email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registre-se</h2>
        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => [setNome(e.target.value), setError('')]}
          />
          <Input
            type="text"
            placeholder="Digite seu login"
            value={login}
            onChange={(e) => [setLogin(e.target.value), setError('')]}
          />
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError('')]}
          />
          <Input
            type="email"
            placeholder="Confirme seu e-mail"
            value={emailConf}
            onChange={(e) => [setEmailConf(e.target.value), setError('')]}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError('')]}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button Text="Inscrever-se" onClick={handleRegistra} />
        </div>
        <p className="text-gray-600 mt-4 text-center">
          Já tem uma conta?
          <Link to="/" className="text-blue-600 hover:underline">&nbsp;Entre</Link>
        </p>
      </div>
    </div>
  );
};

export default Registrar;
