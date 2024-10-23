import React, { useEffect, useState } from 'react'
import Input from '../../components/form/Input'
import Button from '../../components/form/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EsqueceuSenha = () => {
  const [email, setEmail] = useState("")
  const [OTP, setOTP] = useState()
  const [codigoEnviado, setCodigoEnviado] = useState(false)
  const [timerCount, setTimerCount] = React.useState(60);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);

  const [error, setError] = useState("")

  const handleSubmitEmail = async () => {
    if (!email) {
      setError("preencha todos os campos.");
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('o email fornecido é inválido.');
      return
    }

    try {
      const response = await axios.get("http://localhost:3003/sistema/usuarios")
      const users = response.data
      const emailExists = users.some((u) => u.email === email);
      if (!emailExists) {
        setError("não existe nenhuma conta com esse e-mail cadastrado.")
      }

      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP)

      axios.post("http://localhost:3003/sistema/recuperar_senha_email", {
        OTP,
        recipient_email: email
      })
      setCodigoEnviado(true)
      setDisable(true)
      setTimerCount(60)
    }
    catch (error) {
      console.error(error)
      setError("erro ao enviar o código. tente novamente.");
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
      setError("erro ao reenviar o código. tente novamente.");

    }
  }

  const verifyOTP = () => {
    if (parseInt(OTPinput.join("")) === OTP) {
      console.log("CODIGO CERTO")
    }

    setError("codigo digitado esta errado, tente denovo ou reenvie o codigo")
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

  const DigitarEmail = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold">esqueceu a senha?</h1>
            <p className="text-gray-600">recupere sua senha através codigo que enviaremos ao e-mail digitado abaixo.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none"
                htmlFor="email"
              >
                e-mail
              </label>
              <Input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="email"
                placeholder="digite seu e-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              Text="enviar código"
              className="w-full h-10 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={handleSubmitEmail}
            />

            <p className="text-gray-600 mt-4 text-center">
              lembrou a senha?
              <Link to="/login" className="text-blue-600 hover:underline">&nbsp; faça login</Link>
            </p>
          </div>

        </div>
      </div>
    )
  }

  const DigitarOTP = () => {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>verificação do email</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>foi enviado um codigo para o email {email}</p>
              </div>
            </div>

            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) =>
                          setOTPinput([
                            e.target.value,
                            OTPinput[1],
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            e.target.value,
                            OTPinput[2],
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            e.target.value,
                            OTPinput[3],
                          ])
                        }
                      ></input>
                    </div>
                    <div className="w-16 h-16 ">
                      <input
                        maxLength="1"
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) =>
                          setOTPinput([
                            OTPinput[0],
                            OTPinput[1],
                            OTPinput[2],
                            e.target.value,
                          ])
                        }
                      ></input>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <a
                        href='/#'
                        onClick={() => verifyOTP()}
                        className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        verificar conta
                      </a>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>não recebeu o código?</p>{" "}
                      <a
                        href='/#'
                        className="flex flex-row items-center"
                        style={{
                          color: disable ? "gray" : "blue",
                          cursor: disable ? "none" : "pointer",
                          textDecorationLine: disable ? "none" : "underline",
                        }}
                        onClick={() => resendOTP()}
                      >
                        {disable ? `reenviar código em ${timerCount}s` : "reenviar código"}
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return codigoEnviado ? <DigitarOTP /> : <DigitarEmail />;
}

export default EsqueceuSenha
