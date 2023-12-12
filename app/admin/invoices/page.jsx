"use client";

import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [invoices, setInvoices] = useState([]);

  const userId = searchParams.get("user") || "";

  async function getInvoices() {
    try {
      const { data } = await axios(
        `/api/invoices?` + (userId ? `query=${userId}` : "")
      );
      setInvoices(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  const handleDelete = async (invoiceId) => {
    try {
      const deletedInvoice = await axios.delete(`/api/invoices/${invoiceId}`);
      Modal.success({
        title: "El vuelo se ha cancelado y eliminado del sistema",
        content: <div></div>,
        onOk() {
          return getInvoices();
        },
        okButtonProps: { className: " w-20 bg-green-700 text-slate-200" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="w-full min-h-screen h-auto grid gap-5 justify-center items-start m-auto p-5 bg-[#092635]">
      <table className="h-auto min-w-[1000px] bg-[#1B4242] rounded-lg shadow-md mt-5 border border-slate-400">
        <caption className="text-slate-300 text-2xl mb-5 text-left">
          {userId ? "Mis reservas" : "Lista de reservas de vuelos"}
        </caption>
        <thead>
          <tr>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Origen
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Destino
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Fecha Salida
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Fecha Regreso
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Pasajeros
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Aerolínea
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Precio total
            </th>
            <th className="py-2 px-4 text-slate-300 border border-slate-400 text-start font-normal">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, key) => (
            <tr
              key={invoice._id}
              className={
                "hover:bg-[#193b3b] transition-all " +
                (key % 2 === 0 && "bg-[#193b3b]")
              }
            >
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice?.origin?.airport_name ?? "-"}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice?.destination?.airport_name ?? "-"}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice.departureDate}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice.returnDate}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice.travelers}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                {invoice?.airline?.airline_name ?? "-"}
              </td>
              <td className="py-2 px-4 border-r border-slate-400  text-slate-300 text-start">
                ${invoice.price}
              </td>
              <td className="py-2 px-4 border-r border-slate-400 text-slate-300 text-start">
                <div className="w-auto h-auto flex justify-center items-center gap-5">
                  <Link
                    href={`/invoices/${invoice._id}`}
                    className="h-8 bg-sky-600 text-slate-300 p-2 rounded-md hover:bg-sky-700 transition-all text-xs"
                  >
                    VER
                  </Link>
                  <button
                    type="button"
                    className="h-8 bg-red-600 text-slate-300 p-2 rounded-md hover:bg-red-700 transition-all text-xs"
                    onClick={() => {
                      handleDelete(invoice._id);
                    }}
                  >
                    CANCELAR
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
