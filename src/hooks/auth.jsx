/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("@SaturnoNotes:user", JSON.stringify(user));
      localStorage.setItem("@SaturnoNotes:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ token, user });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao fazer login, tente novamente mais tarde");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@SaturnoNotes:user");
    localStorage.removeItem("@SaturnoNotes:token");
    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar;
      } 

      await api.put("/users", user);
      localStorage.setItem("@SaturnoNotes:user", JSON.stringify(user));

      setData({ user });
      alert("Perfil atualizado com sucesso");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Erro ao atualizar perfil, tente novamente mais tarde");
      }
    }
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("@SaturnoNotes:user");
    const storagedToken = localStorage.getItem("@SaturnoNotes:token");

    if (storagedUser && storagedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
      setData({ user: JSON.parse(storagedUser), token: storagedToken });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user: data.user, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
