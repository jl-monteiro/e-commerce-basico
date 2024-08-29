import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

const Login = () => {
  const { logar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = await logar(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-600">Faça login para acessar sua conta</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-sm font-medium leading-none"
              htmlFor="email"
            >
              E-Mail
            </label>
            <Input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => [setEmail(e.target.value), setError('')]}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="password"
              >
                Senha
              </label>
              {/*
              <Link to="/esqSenha" className="text-sm text-blue-600 underline">
                Esqueceu a senha?
              </Link>
              */}

            </div>
            <Input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => [setSenha(e.target.value), setError('')]}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            Text="Entrar"
            className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleLogin}
          >

          </Button>

          <p className="text-gray-600 mt-4 text-center">
            Não tem uma conta?
            <Link to="/registrar" className="text-blue-600 hover:underline">&nbsp; Registre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
