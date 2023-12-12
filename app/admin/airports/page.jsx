"use client"

import { useEffect, useState } from "react";
import axios from "axios";

export default async function Page() {
  const [airports, setAirports] = useState([]);

  async function getAirports() {
    try {
      const { data } = await axios("/api/airports");
      setAirports(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (airportId) => {
    try {
      const deletedAirport = await axios.delete(`/api/airports/${aiportId}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAirports();
  }, []);

  return (
    <div className="w-full min-h-screen h-auto grid gap-5 justify-center items-start m-auto p-5 bg-[#092635]">
      <table className="h-auto min-w-[1000px] bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <caption className="text-slate-300 text-2xl mb-5 text-left">
          Lista de aeropuertos
        </caption>
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Nombre
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Ciudad
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              País
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Código IATA
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Coordenadas
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal hidden">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, key) => (
            <tr
              key={airport._id}
              className={
                "hover:bg-[#193b3b] transition-all " +
                (key % 2 === 0 && "bg-[#193b3b]")
              }
            >
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {airport.airport_name}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {airport.city}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {airport.country}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {airport.IATA_code}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {airport.coordinates}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start hidden">
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <button
                    type="button"
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs"
                    onClick={() => {
                      handleDelete(airport._id);
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
