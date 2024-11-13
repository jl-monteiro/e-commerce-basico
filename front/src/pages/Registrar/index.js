import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Registrar = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("")
  const [error, setError] = useState("");

  const [passShow, setPassShow] = useState(false)
  const [passShowConf, setPassShowConf] = useState(false)

  const navigate = useNavigate();
  const { registrar } = useAuth();

  const handlePassShow = () => {
    if (passShow) {
      setPassShow(false)
    }
    else {
      setPassShow(true)
    }
  }
  const handlePassShowConf = () => {
    if (passShowConf) {
      setPassShowConf(false)
    }
    else {
      setPassShowConf(true)
    }
  }

  const handleRegistra = async (e) => {
    e.preventDefault()
    if (!nome || !login || !email || !emailConf || !senha || !senhaConf) {
      setError("Preencha todos os campos.");
      return
    } else if (email !== emailConf) {
      setError("Os e-mails não coincidem.");
      return
    }
    else if (senha !== senhaConf) {
      setError("As senhas não coincidem")
      return
    }
    if (nome.length < 3) {
      setError("O nome deve ter pelo menos 3 caracteres")
      return
    }
    if (login.length < 3) {
      setError("O login deve ter pelo menos 3 caracteres")
      return
    }
    if (senha.length < 7) {
      setError("A senha deve ter pelo menos 7 caracteres.")
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('O email fornecido é inválido.');
      return
    }
    const loginRegex =  /^[a-zA-Z0-9]+$/
    if(!loginRegex.test(login)){
      setError("Login não pode ter caracter especial ou espaço em branco.")
      return
    }

    const res = await registrar(nome, login, email, senha);

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
          <h1 className="text-3xl font-bold">Registrar</h1>
          <p className="text-gray-600">Crie uma conta para começar a usar o serviço</p>
        </div>
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="nome"
              >
                Nome
              </label>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => [
                  setNome(e.target.value),
                  setError('')
                ]}
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="login"
              >
                Login
              </label>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Digite seu login"
                value={login}
                onChange={(e) => [setLogin(e.target.value), setError('')]}
              />
            </div>
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
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                Confirmar e-mail
              </label>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="Confirme o e-mail"
                value={emailConf}
                onChange={(e) => [setEmailConf(e.target.value), setError('')]}
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
                className="mt-1 p-2 w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md pr-10"
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
            <div className='relative space-y-2'>
              <div className='flex items-center justify-between'>
                <label
                  className='text-sm font-medium leading-none'
                  htmlFor='password'
                >
                  Confirmar senha
                </label>
              </div>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type={passShowConf ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={senhaConf}
                onChange={(e) => [setSenhaConf(e.target.value), setError('')]}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1 focus:outline-none'
                onClick={handlePassShowConf}
              >
                {passShowConf && <FaRegEyeSlash />}
                {!passShowConf && <FaRegEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              Text="Registrar"
              className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={handleRegistra}
            >
            </Button>

            <p className="text-gray-600 mt-4 text-center">
              Já tem uma conta?
              <Link to="/login" className="text-blue-600 hover:underline">&nbsp; Faça login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
