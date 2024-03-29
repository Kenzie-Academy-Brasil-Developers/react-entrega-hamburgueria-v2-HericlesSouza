import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  iLoginUser,
  iRegisterUser,
  iUserProviderProps,
  iUserProviderValue,
} from "./types";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserContext = createContext({} as iUserProviderValue);

export const UserProvider = ({ children }: iUserProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const navigate = useNavigate();

  const userRegister = async (data: iRegisterUser) => {
    const id = toast.loading("Por favor espere...");

    try {
      await api.post("/users", data);

      toast.update(id, {
        render: "Conta criada com sucesso!",
        type: "success",
        isLoading: false,
        theme: "colored",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/");
    } catch (error) {
      setRegisterError(true);

      toast.update(id, {
        render: "Endereço de e-mail já existe!",
        type: "error",
        isLoading: false,
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const userLogin = async (data: iLoginUser) => {
    const id = toast.loading("Por favor espere...");

    try {
      const request = await api.post("/login", data);

      toast.update(id, {
        render: "Login realizado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "colored",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/dashboard");

      localStorage.setItem("@token", JSON.stringify(request.data.accessToken));
    } catch (error) {
      toast.update(id, {
        render: "Ops, algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "colored",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setRegisterError(true);
    }
  };
  return (
    <UserContext.Provider
      value={{
        darkMode,
        setDarkMode,
        navigate,
        userRegister,
        registerError,
        setRegisterError,
        userLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
