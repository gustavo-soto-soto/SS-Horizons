"use client";

import { calculateArrivalTime } from "@/app/scripts/ArrivalTime";
import { useContext } from "react";
import { FlightContext } from "../../FlightContext";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { ExclamationCircleFilled } from "@ant-design/icons"

const FlightCard = ({ flight }) => {

  const { data: session } = useSession()
  const router = useRouter()

  const { origin, destination, distance, duration, price, airline, departureDate, returnDate, departure_time } = flight

  const arrival_time = calculateArrivalTime(departure_time, duration);
  const { handleCurrentStep, handleChangeInvoice } = useContext(FlightContext);

  const handleClick = () => {

    if (!session){
      Modal.confirm({
        title: "Para realizar reservas, por favor inicia sesión con tu cuenta o crea una nueva",
        content: (<div>Queremos asegurarnos de brindarte la mejor experiencia</div>),
        icon: <ExclamationCircleFilled />,
        onOk() {
          router.push("/login")
        },
        okButtonProps: { className: " w-20 bg-sky-700 text-slate-200"},
        onCancel() {},
        okText: "Login",
        cancelText: "Cancelar"
      });
      return
    }

    const invoiceData = {
      ...flight,
      arrival_time: arrival_time
    }
    handleChangeInvoice(invoiceData)
    handleCurrentStep(1)
  }

  return (
    <div
      className="col-span-1 h-64 grid grid-cols-1 justify-start items-center gap-3 p-5 bg-[#1B4242] text-slate-300 
            text-lg rounded-md shadow-md cursor-pointer hover:scale-105 transition-all"
    >
      <div className="col-span-1 w-full flex justify-between items-center">
        <div className="w-[25%] grid justify-end items-center gap-1 relative">
          <h2 className="text-end">{departure_time}</h2>
          <h3 className="text-sm">{origin.airport_name}</h3>
          <h4 className="text-sm text-end">{origin.country}</h4>
        </div>
        <span className="w-[20%] border"></span>
        <div className="grid justify-center items-center relative">
          
          <Image src={"/icons/departure-plane.svg"} width={50} height={50} alt="departure-plane icon" className="absolute top-[-45px]"/>
          <h2>{duration} h</h2>

        </div>
        <span className="w-[20%] border"></span>
        <div className="w-[25%] grid justify-start items-center gap-1 relative">
          <h2>{arrival_time}</h2>
          <h3 className="text-sm">{destination.airport_name}</h3>
          <h4 className="text-sm">{destination.country}</h4>
        </div>
      </div>
      <div className="col-span-1 w-full flex justify-between items-center">
        <div className="w-[25%] grid justify-end items-center">
          <h2 className="text-slate-200 text-2xl">
            Operado por {airline.airline_name} {`(${airline.IATA_code})`}
          </h2>
        </div>
        <div className="w-[20%] grid justify-end items-center gap-2 p-2">
          <h1 className="text-3xl text-slate-200 text-center">${price}</h1>
          <button
            className="w-80 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all"
            onClick={handleClick}
          >
            SELECCIONAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
