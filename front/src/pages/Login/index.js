import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const { logar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [passShow, setPassShow] = useState(false)

  const handlePassShow = () => {
    if (passShow) {
      setPassShow(false)
    }
    else {
      setPassShow(true)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
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
        <form>
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
            <div className="relative space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium leading-none"
                  htmlFor="password"
                >
                  Senha
                </label>
              </div>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type={passShow ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => [setSenha(e.target.value), setError('')]}
              />

              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1 focus:outline-none'
                onClick={handlePassShow}
              >
                {passShow && <FaRegEyeSlash />}
                {!passShow && <FaRegEye />}
              </button>

            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              Text="Entrar"
              className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={handleLogin}
            />

            <div className="mt-4 text-center">
              <Link to="/esqueceuSenha" className="text-sm text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <p className="text-gray-600 mt-4 text-center">
              Não tem uma conta?
              <Link to="/registrar" className="text-blue-600 hover:underline">&nbsp; Registre-se</Link>
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Login;
