// userinfo.js
import axios from "axios";
import { useState, useEffect } from "react";

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user_token"));
    const email = userData.email;

    axios.get("http://localhost:3003/sistema/usuarios")
      .then((response) => {
        const user = response.data.find((u) => u.email === email);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return user
};

export default UserInfo;
