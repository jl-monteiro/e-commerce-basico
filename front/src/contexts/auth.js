import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const bcrypt = require("bcryptjs");
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      const storedUser = JSON.parse(userToken);
      axios.get("http://localhost:3003/sistema/usuarios").then((response) => {
        const userInfo = response.data.find(
          (u) => u.token === storedUser.token
        );
        setUser(userInfo);
      });
    }
  }, []);

  const logar = async (email, senha) => {
    try {
      const response = await axios.get(
        "http://localhost:3003/sistema/usuarios"
      );
      const users = response.data;
      const user = users.find((u) => u.email === email);

      if (user) {
        const token = user.token;
        const compare = bcrypt.compareSync(senha, user.senha);
        if (!compare) {
          return "Email ou senha incorretos";
        }
        localStorage.setItem("user_token", JSON.stringify({ token }));
        setUser(user);
        return null;
      } else {
        return "Email ou senha incorretos";
      }
    } catch (error) {
      console.error("Login falhou", error);
      return "Ocorreu um erro.";
    }
  };

  const registrar = async (nome, login, email, senha, tipo = "usuario") => {
    try {
      const response = await axios.get(
        "http://localhost:3003/sistema/usuarios"
      );
      const users = response.data;
      const emailExists = users.some((u) => u.email === email);
      const loginExists = users.some((u) => u.login === login);
      const token = Math.random().toString(36).substring(2);

      if (emailExists) {
        return "Email ja cadastrado.";
      }
      if (loginExists) {
        return "Login ja cadastrado.";
      } else {
        await axios.post("http://localhost:3003/sistema/usuarios", {
          nome,
          login,
          email,
          senha,
          tipo,
          token,
        });
        localStorage.setItem("user_token", JSON.stringify({ token }));
        const response = await axios.get(
          "http://localhost:3003/sistema/usuarios"
        );
        const users = response.data;
        const user = users.find((u) => u.token === token);
      
        setUser(user);
        return null;
      }
    } catch (error) {
      console.error("Registro falhou", error);
      return "Ocorreu um erro ao fazer o cadastro";
    }
  };

  const deslogar = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, logar, registrar, deslogar }}
    >
      {children}
    </AuthContext.Provider>
  );
};
