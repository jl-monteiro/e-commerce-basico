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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-6">
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError('')]}
          />
          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError('')]}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button Text="Entrar" onClick={handleLogin} />
        </div>
        <p className="text-gray-600 mt-4 text-center">
          Não tem uma conta?
          <Link to="/registrar" className="text-blue-600 hover:underline">&nbsp;Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
  