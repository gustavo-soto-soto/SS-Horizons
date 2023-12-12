"use client";

import { Modal } from "antd";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Form = ({ user = {} }) => {

  const { data: session } = useSession()
  const [roles, setRoles] = useState([]);

  const router = useRouter()

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
      const role = formData.get("role");

      const response = await axios.put(`/api/users/${user._id}`, {
        firstname,
        lastname,
        email,
        phone,
        username,
        password,
        role,
      });

      Modal.success({
        title: "Datos actualizados con éxito",
        content: <div></div>,
        onOk() {
          router.refresh()
        },
        okButtonProps: { className: " w-20 bg-green-700 text-slate-200" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const inputStyles =
    "w-[70%] col-span-1 h-16 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider";

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios("/api/roles");
        const roleList = await response.data;
        setRoles(roleList);
      } catch (error) {
        console.error(error);
      }
    };

    getRoles();
    
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-[90%] w-3/6 bg-[#1B4242] m-auto col-span-1 flex flex-col items-center justify-center gap-8 rounded-md shadow-md p-5"
    >
      <h1 className="text-2xl text-slate-200 tracking-wide text-center uppercase">
        { user.username === session?.user?.username ? "Mi perfil" : `Datos de usuario ${user.username}`}
      </h1>

      <input
        type="text"
        name="firstname"
        id="firstname"
        placeholder="Nombres..."
        required
        defaultValue={user.firstname}
        className={inputStyles}
      />
      <input
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Apellidos..."
        required
        defaultValue={user.lastname}
        className={inputStyles}
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Correo electrónico..."
        required
        defaultValue={user.email}
        className={inputStyles}
      />
      <input
        type="number"
        name="phone"
        id="phone"
        placeholder="Teléfono..."
        required
        defaultValue={user.phone}
        className={inputStyles}
      />

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nombre de usuario..."
        required
        defaultValue={user.username}
        className={inputStyles}
        hidden
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña..."
        required
        defaultValue={user.password}
        className={inputStyles}
        hidden
      />

        <select name="role" id="role" defaultValue={user.role} className={inputStyles} disabled={session?.user?.role !== "admin"}>
            <option selected className="bg-[#1B4242]">{user.role}</option>
          {roles.map((role) => (
            role.role_name !== user.role ? 
            <option value={role.role_name} key={role._id} className="bg-[#1B4242]">{role.role_name}</option>
            : null
          ))}
        </select>

      <input
        type="submit"
        value="ACTUALIZAR DATOS"
        className="w-[70%] h-16 bg-[#9EC8B9] rounded-md shadow-md text-[#1B4242] hover:brightness-75 cursor-pointer transition-all tracking-widest"
      />
    </form>
  );
};

export default Form;
