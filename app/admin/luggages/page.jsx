"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default async function Page() {
  
  const [luggages, setLuggages] = useState([])
  
  async function getLuggages() {
    try {
      const { data } = await axios ("/api/luggages")
      setLuggages(data)
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async(luggageId) => {
    try {
      const deletedLuggage = await axios.delete(`/api/luggages/${luggageId}`)
    } catch (error) {
      console.error(error)
    }
}
  
  useEffect( () => {
    getLuggages()
  }, [])

  
  return (
    <div className="w-full min-h-screen h-auto grid gap-5 justify-center items-start m-auto p-5 bg-[#092635]">
      <table className="h-auto min-w-[1000px] bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <caption className="text-slate-300 text-2xl mb-5 text-left">
          Lista de equipajes
        </caption>
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Nombre
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Precio por unidad
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Descripción
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal hidden">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {luggages.map((luggage, key) => (
            <tr
              key={luggage._id}
              className={
                "hover:bg-[#193b3b] transition-all " +
                (key % 2 === 0 && "bg-[#193b3b]")
              }
            >
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {luggage.luggage_name}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                ${luggage.unit_price}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {luggage.description}
              </td>
              <td className="py-2 px-4 border-r border-slate-400 text-slate-300 text-start hidden">
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <button
                    type="button"
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs"
                    onClick={() => {
                      handleDelete(luggage._id);
                    }}
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
