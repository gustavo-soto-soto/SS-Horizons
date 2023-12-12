"use client"

import { Modal } from "antd";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

  const { data: session } = useSession()

  const [users, setUsers] = useState([])

  async function getUsers(){
    try {
      const { data } = await axios ("/api/users")
      setUsers(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async(userId) => {
      try {
        const deletedUser = await axios.delete(`/api/users/${userId}`)
        Modal.success({
          title: "El usuario se ha eliminado con éxito",
          content: <div></div>,
          onOk() {
            if (userId === session.user._id) return signOut({ callbackUrl: "/" });
            return getUsers()
          },
          okButtonProps: { className: " w-20 bg-green-700 text-slate-200" },
        });
      } catch (error) {
        console.error(error)
      }
  }

  useEffect( () => {
    getUsers()
  }, [])

  return (
    <div className="w-full h-fit grid gap-5 justify-center items-start p-5 bg-[#092635]">
      <table className="h-auto min-w-[1000px] bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <caption className="text-slate-300 text-2xl mb-5 text-left">Lista de usuarios</caption>
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Nombre</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Apellidos</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Email</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Teléfono</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Nombre de usuario</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Rol</th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map( (user, key) => (
            <tr key={user._id} className={"hover:bg-[#193b3b] transition-all " + (key % 2 === 0 && "bg-[#193b3b]") }>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.firstname}</td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.lastname}</td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.email}</td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.phone}</td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.username}</td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">{user.role}</td>
              <td className="py-2 px-4 border-r border-slate-400 text-slate-300 text-start">
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <Link href={`/profile/${user._id}`} 
                  className="h-8 bg-orange-500 text-slate-300 p-2 rounded-md hover:bg-orange-600 transition-all text-xs" 
                  >MODIFICAR</Link>
                    <button type="button"  
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs" 
                    onClick={ () => { handleDelete(user._id) } }>ELIMINAR</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
