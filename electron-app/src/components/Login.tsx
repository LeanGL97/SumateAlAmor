"use client";

import { MouseEvent, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "./Button";
import { toast } from "sonner";
import loginService from "@/services/login";

type userInfoType = {
  user: string;
  password: string;
};

const Login = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>({ user: "", password: "" });
  const [password, setPassword] = useState<"password" | "text">("password");
  const [passwordIcon, setPasswordIcon] = useState<boolean>(true);

  const passwordHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (password == "password") {
      setPassword("text");
      setPasswordIcon(false);
    }
    if (password == "text") {
      setPassword("password");
      setPasswordIcon(true);
    }
  };

  const submitHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userInfo.user == "" || userInfo.password == "") {
      toast.warning("Por favor, rellene todos los campos para poder iniciar sesion");
      return;
    }
    const response = loginService(userInfo.user, userInfo.password);
    toast.promise(response, {
      loading: "Iniciando sesion...",
      success: "¡Sesion iniciada exitosamente!",
      error: (data) => {
        return `Error al iniciar sesion (${data})`;
      },
    });
  };

  return (
    <form className="p-5 w-[70vw] bg-secundario rounded-md flex flex-col items-center justify-center ">
      <label className="text-2xl cuarto">Usuario</label>
      <input
        type="text"
        value={userInfo.user}
        className="w-full h-8 pl-1.5 text-xl rounded-md bg-cuarto"
        required
        onChange={(e) => setUserInfo({ ...userInfo, user: e.target.value })}
      />

      <label className="mt-3 text-2xl cuarto">Contraseña</label>
      <div className="flex w-full mb-4 flex-nowrap">
        <input
          type={password}
          value={userInfo.password}
          className="flex flex-1 h-8 pl-1.5 text-xl rounded-md bg-cuarto"
          required
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
        <button
          className="flex items-center justify-center w-8 h-8 rounded-md bg-cuarto ml-1.5 hover:cursor-pointer"
          onClick={(e) => passwordHandler(e)}
        >
          {passwordIcon ? <FaEye className="primario" /> : <FaEyeSlash className="primario" />}
        </button>
      </div>
      <Button variant="yellow" onClick={(e) => submitHandler(e)}>
        Iniciar Sesion
      </Button>
    </form>
  );
};

export default Login;
