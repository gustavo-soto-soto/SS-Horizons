"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [schedules, setSchedules] = useState([]);

  const handleDelete = async (scheduleId) => {
    try {
      const deletedSchedule = await axios.delete(
        `/api/schedules/${scheduleId}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getSchedules() {
      try {
        const { data } = await axios("/api/schedules");
        setSchedules(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSchedules();
  }, []);

  return (
    <div className="w-full min-h-screen h-auto grid gap-5 justify-center items-start m-auto p-5 bg-[#092635]">
      <table className="w-full min-w-[1000px] h-auto bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <caption className="text-slate-300 text-2xl mb-5 text-left">
          Lista de horarios
        </caption>
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Hora salida
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, key) => (
            <tr
              key={schedule._id}
              className={
                "hover:bg-[#193b3b] transition-all " +
                (key % 2 === 0 && "bg-[#193b3b]")
              }
            >
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {schedule.departure_time}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <button
                    type="button"
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs"
                    onClick={() => {
                      handleDelete(schedule._id);
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
