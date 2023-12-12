"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";

export default function Page() {

  const [roles, setRoles] = useState([]);

  async function getRoles() {
    try {
      const { data } = await axios("/api/roles");
      setRoles(data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (roleId) => {
    try {
      const deletedRole = await axios.delete(`/api/roles/${roleId}`);
      Modal.success({
        title: "El rol se ha eliminado con éxito",
        content: <div></div>,
        onOk() {
          return getRoles()
        },
        okButtonProps: { className: " w-20 bg-green-700 text-slate-200" },
      });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getRoles();
  }, []);

  return (
    <div className="w-full h-fit grid gap-5 justify-center items-start p-5 bg-[#092635]">
      <div className="w-full flex justify-between items-center mt-5">
        <h1 className="text-slate-300 text-2xl text-left">Lista de roles</h1>
        <Link
          href={"/create/role"}
          className="w-40 h-10 bg-[#9EC8B9] text-[#1B4242] p-2 rounded-md hover:brightness-75 transition-all text-center uppercase"
        >
          AGREGAR ROL
        </Link>
      </div>
      <table className="h-auto min-w-[1000px] bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Nombre
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Descripción
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, key) => (
            <tr
              key={role._id}
              className={
                "hover:bg-[#193b3b] transition-all " +
                (key % 2 === 0 && "bg-[#193b3b]")
              }
            >
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {role.role_name}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {role.description}
              </td>
              <td>
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <button
                    type="button"
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs"
                    onClick={() => {
                      handleDelete(role._id);
                    }}
                    hidden={
                      role.role_name === "standard" ||
                      role.role_name === "admin"
                    }
                  >
                    ELIMINAR
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
