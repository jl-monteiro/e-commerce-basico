import React, { useContext, useEffect, useState } from 'react'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MudarSenha from '../MudarSenha'

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("")
  const [OTP, setOTP] = useState()
  const [codigoEnviado, setCodigoEnviado] = useState(false)
  const [codigoCorreto, setCodigoCorreto] = useState(false)
  const [timerCount, setTimerCount] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmitEmail = async () => {
    if (!email) {
      setError("Preencha todos os campos.");
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('O email fornecido é inválido.');
      return
    }
    setSuccess(true)
    try {
      const response = await axios.get("http://localhost:3003/sistema/usuarios")
      const users = response.data
      const emailExists = users.some((u) => u.email === email);
      if (!emailExists) {
        setError("Não existe nenhuma conta com esse e-mail cadastrado.")
        return
      }

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP)

      const res = await axios.post("http://localhost:3003/sistema/recuperar_senha_email", {
        OTP,
        recipient_email: email
      })
      if (res) {
        setCodigoEnviado(true)
        setDisable(true)
        setTimerCount(60)
      }
    }
    catch (error) {
      console.error(error)
      setError("Erro ao enviar o código. tente novamente.");
    }
  }


  const resendOTP = () => {
    if (disable) return
    try {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP)

      axios.post("http://localhost:3003/sistema/recuperar_senha_email", {
        OTP,
        recipient_email: email
      })

      setDisable(true)
      setTimerCount(60)
    }
    catch (error) {
      console.log(error)
      setError("Erro ao reenviar o código. Tente novamente.");

    }
  }

  const verifyOTP = (e) => {
    e.preventDefault()
    if (parseInt(OTPinput.join("")) === OTP) {
      setCodigoCorreto(true)
      return
    }
    setError("Codigo digitado incorreto, tente denovo ou reenvie o codigo")
    return
  }

  useEffect(() => {
    let timer
    if (disable && timerCount > 0) {
      timer = setInterval(() => {
        setTimerCount((prev) => prev - 1)
      }, 1000);
    }

    if (timerCount === 0) {
      setDisable(false)
    }

    return () => clearInterval(timer)
  }, [disable, timerCount]);

  const renderOTPInputs = () => (
    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
      {OTPinput.map((value, index) => (
        <div className="w-16 h-16" key={index}>
          <input
            maxLength="1"
            className="w-full h-full text-center border border-gray-200 rounded-xl text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            value={value}
            onChange={(e) => {
              const newOTPInput = [...OTPinput];
              newOTPInput[index] = e.target.value;
              setOTPinput(newOTPInput);
            }}
          />
        </div>
      ))}
    </div>
  );

  if (codigoCorreto) return <MudarSenha />
  return codigoEnviado ? (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Verificação do email</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Foi enviado um código para o email {email}</p>
            </div>
          </div>

          <form>
            <div className="flex flex-col space-y-16">
              {renderOTPInputs()}

              <div className="flex flex-col space-y-5">
                <Button
                  onClick={verifyOTP}
                  className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                  Text="Verificar código"
                />
                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <p>Não recebeu o código?</p>
                  <a
                    href='/#'
                    className="flex flex-row items-center"
                    style={{
                      color: disable ? "gray" : "blue",
                      cursor: disable ? "none" : "pointer",
                      textDecorationLine: disable ? "none" : "underline",
                    }}
                    onClick={resendOTP}
                  >
                    {disable ? `Reenviar código em ${timerCount}s` : "Reenviar código"}
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold">Esqueceu a senha?</h1>
          <p className="text-gray-600">Recupere sua senha através codigo que enviaremos ao e-mail digitado abaixo.</p>
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">Codigo enviado com sucesso! Sendo redirecionado.</p>}

          <Button
            Text="Enviar código"
            className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleSubmitEmail}
          />

          <p className="text-gray-600 mt-4 text-center">
            Lembrou a senha?
            <Link to="/login" className="text-blue-600 hover:underline">&nbsp; Faça login</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default EsqueceuSenha
