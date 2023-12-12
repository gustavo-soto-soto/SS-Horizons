"use client";

import { Modal } from "antd";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();

  //const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const firstname = formData.get("firstname");
      const lastname = formData.get("lastname");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const username = formData.get("username");
      const password = formData.get("password");
      const role = process.env.NEXT_PUBLIC_DEFAULT_ROLE;

      const response = await axios.post("/api/users", {
        firstname,
        lastname,
        email,
        phone,
        username,
        password,
        role,
      });

      const userCreated = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (userCreated.ok){
        Modal.success({
          title: "Su cuenta ha sido creada con éxito!",
          content: (<div>Ahora puedes realizar reservas y aprovechar los beneficios de la la plataforma</div>),
          onOk() {
            return router.push("/login")
          },
          okButtonProps: { className: " w-20 bg-green-700 text-slate-200"}
        });
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message ?? error.message);
      } else setError(error.message);
    }
  };

  const inputStyles = "w-[70%] col-span-1 h-16 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider";

  return (
    <div className="w-full h-auto min-h-screen bg-[#092635] grid grid-cols-1 items-center justify-center p-2">
      <form
        onSubmit={handleSubmit}
        className="h-[90%] w-3/6 bg-[#1B4242] m-auto col-span-1 flex flex-col items-center justify-center gap-8 rounded-md shadow-md p-4"
      >

        <h1 className="text-2xl text-slate-200 tracking-wide text-center uppercase">Registro de Usuarios</h1>

        <input
          type="text"
          name="firstname"
          id="firstname"
          placeholder="Nombres..."
          required
          className={inputStyles}
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Apellidos..."
          required
          className={inputStyles}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Correo electrónico..."
          required
          className={inputStyles}
        />
        <input
          type="number"
          name="phone"
          id="phone"
          placeholder="Teléfono (Min 8 dígitos) ..."
          title="Mínimo 8 dígitos"
          min="10000000"
          required
          className={inputStyles}
        />

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nombre de Usuario (4-16 Carácteres) ..."
          required
          className={inputStyles}
          pattern=".{4,16}"
          title="Mínimo 4 dígitos, máximo 16"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña (8-16 carácteres) ..."
          required
          className={inputStyles}
          pattern=".{8,16}"
          title="Mínimo 8 dígitos, máximo 16"
        />

        <input type="submit" value="CREAR CUENTA" className="w-[70%] h-16 bg-[#9EC8B9] rounded-md shadow-md text-[#1B4242] hover:brightness-75 cursor-pointer transition-all tracking-widest"/>

        <span className="text-red-500">{error}</span>
      </form>
    </div>
  );
}
