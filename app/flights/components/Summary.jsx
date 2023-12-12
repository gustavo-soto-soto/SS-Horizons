"use client";

import { useContext, useState } from "react";
import { FlightContext } from "../FlightContext";
import axios from "axios";
import { Modal } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import InvoiceComponent from "../../components/Invoice";
import { Spin } from 'antd';

const Summary = () => {

  const { data: session } = useSession()
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const {
    handleCurrentStep,
    handleChangeInvoice,
    getTotalLuggage,
    getTotalSeats,
    totalPrice,
    invoice: {
      origin,
      destination,
      departureDate,
      returnDate,
      price,
      duration,
      distance,
      travelers,
      airline,
      departure_time,
      arrival_time,
      luggage,
      seats,
      travelerData,
      billing,
    },
  } = useContext(FlightContext);

  const totalLuggage = getTotalLuggage();
  const totalSeats = getTotalSeats();

  const handleClick = async(e) => {
    try {

      setLoading(true)

      const invoicePayload = {
        user_id: session?.user?._id ?? "",
        origin,
        destination,
        departureDate,
        returnDate,
        price,
        duration,
        distance,
        travelers,
        airline,
        departure_time,
        arrival_time,
        luggage,
        seats,
        travelerData,
        billing,
        total_luggage: totalLuggage,
        total_seats: totalSeats,
        total_price: totalPrice,
      };
  
      const response = await axios.post("/api/invoices", invoicePayload)

      const { _id } = await response.data

      try {
        
        const server = process.env.NEXT_PUBLIC_SERVER_URL

        const html = `
          <div>
            <h1>SS Horizons - ${airline.airline_name}</h1>
            <h2>${origin.airport_name} - ${destination.airport_name}</h2>
            <h3>${departureDate} - ${returnDate}</h3>
            <h4>Total para ${travelers} pasajeros: $${totalPrice}</h4>
            <h5>Debito a ${billing.cardholder}</h5>
            <h5>Tarjeta terminada en ${billing.card_number.slice(-4)}</h5>
            <a href="${server}/invoices/${_id}" target="_blank"}>VER FACTURA AQUÍ</a>
          </div>
        `

        const emailResponse = await axios.post("/api/email", 
          { 
            to: session.user.email,
            subject: `Factura Electrónica ${_id} - ${session.user.firstname} ${session.user.lastname}`,
            html
          }
        )

      } catch (error) {
        console.error(error)
      }

      Modal.success({
        title: "Felicidades, su reserva ha sido procesada con éxito, Buen viaje!",
        content: (<div>Número de factura: <b>{_id}</b> Puede darle seguimiento al correo enviado a {session.user.email} y en nuestros medios contacto. Gracias por preferirnos</div>),
        onOk() {
          router.push(`/admin/invoices?user=${session?.user?._id}`)
        },
        okButtonProps: { className: " w-20 bg-green-700 text-slate-200"}
      });

    } catch (error) {
      console.error(error);
    } finally{
      setLoading(false)
    }

  };

  return (
    <div className="w-full h-full grid grid-cols-1 items-start gap-10">
      <div className="w-full h-10 flex justify-between items-center">
        <div className="h-full grid justify-start items-center gap-2">
          <h1 className="text-2xl text-slate-300 text-start">
            Resumen de viaje
          </h1>
        </div>
        {loading ? <Spin size="large"/> : 
          <button
            className="w-52 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all"
            onClick={handleClick}
          >
            PROCESAR PAGO
          </button>
        }
      </div>
      
      <InvoiceComponent data={ { airline, origin, destination,
        departureDate, departure_time,
        returnDate, travelerData, luggage,
        total_luggage: totalLuggage, seats, total_seats: totalSeats,
        travelers, price, total_price: totalPrice }}
      />

    </div>
  );
  
};

export default Summary;
