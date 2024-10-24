import React, { useState } from "react";
import Button from "../../components/form/Button";
import Input from "../../components/form/Input";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const MudarSenha = ({ email }) => {
  const [senha, setSenha] = useState("")
  const [senhaConf, setSenhaConf] = useState("")
  const [error, setError] = useState("");

  const [passShow, setPassShow] = useState(false)
  const [passShowConf, setPassShowConf] = useState(false)
  const [senhaAtualizada, setSenhaAtualizada] = useState(false)

  const navigate = useNavigate()

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

  const handleSubmitSenha = async () => {
    if (!senha || !senhaConf) {
      setError("Preencha todos os campos.")
      return
    }
    if (senha !== senhaConf) {
      setError("As senhas não coincidem.")
      return
    }
    if (senha.length < 7) {
      setError("A senha deve ter pelo menos 7 caracteres.")
      return
    }
    try {
      const response = await axios.get("http://localhost:3003/sistema/usuarios")
      const users = response.data
      const user = users.find((u) => u.email === email)

      const responsePut = await axios.put(`http://localhost:3003/sistema/usuarios/${user.id}`, { senha: senha })
      if (responsePut) {
        setSenhaAtualizada(true)
        return
      }
      console.log("ERRO: ")
      console.log(responsePut)
    }
    catch (error) {
      console.error(error)
    }
  }
  if (senhaAtualizada) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Senha Atualizada!</h1>
        <p className="text-gray-600 mt-4">Sua senha foi atualizada com sucesso. Faça login.</p>
        <Button
          Text="Voltar ao Login"
          className="mt-6 w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  )
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Redefinir Senha</h1>
          <p className="text-gray-600">Digite sua nova senha abaixo.</p>
        </div>
        <div className="space-y-4">
          <div className="relative space-y-2">
            <label className="text-sm font-medium leading-none">Nova Senha</label>
            <Input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={passShow ? "text" : "password"}
              placeholder="Digite sua nova senha"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-0 focus:outline-none'
              onClick={handlePassShow}
            >
              {passShow && <FaRegEyeSlash />}
              {!passShow && <FaRegEye />}
            </button>
          </div>
          <div className="relative space-y-2">
            <label className="text-sm font-medium leading-none">Confirmar Senha</label>
            <Input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type={passShowConf ? "text" : "password"}
              placeholder="Confirme sua nova senha"
              value={senhaConf}
              onChange={(e) => {
                setSenhaConf(e.target.value);
                if (error) setError('');
              }}
            />
            <button
              type='button'
              className='absolute right-3 top-1/2 transform -translate-y-0 focus:outline-none'
              onClick={handlePassShowConf}
            >
              {passShowConf && <FaRegEyeSlash />}
              {!passShowConf && <FaRegEye />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            Text="Redefinir Senha"
            className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleSubmitSenha}
          />
          <p className="text-gray-600 mt-4 text-center">
            Lembrou da senha?
            <Link to="/login" className="text-blue-600 hover:underline">&nbsp; Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MudarSenha