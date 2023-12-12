"use client";

import { useContext, useEffect } from "react";
import { FlightContext } from "../FlightContext";

const TotalFooter = () => {

  const { invoice, totalPrice, handleCalculatePrice, handleCurrentStep } = useContext(FlightContext)

  const { departureDate, returnDate, origin, destination, departure_time, arrival_time, travelers } = invoice
  
  useEffect( () => {
    handleCalculatePrice()
  }, [invoice])

  const handleClick = () => {
    
  }
  
  return (
    <div className="w-full h-16 bg-[#1B4242] sticky border-t border-x border-slate-400 bottom-0 left-0 rounded-tl-2xl rounded-tr-2xl z-50 p-2 shadow-md flex justify-evenly items-start ">

      <div className="w-1/5 grid justify-center items-center text-start">
        <h1 className="text-slate-300">Ida: {departureDate}</h1>
        <div className="w-full flex justify-center items-center gap-2">
          <div className="flex gap-2 text-slate-400">
            <h2 >{origin.IATA_code}</h2>
            <span>{departure_time} ➨</span>
          </div>
          <div className="flex gap-2 text-slate-400">
            <h2>{destination.IATA_code}</h2>
            <span>{arrival_time}</span>
          </div>
        </div>
      </div>

      <div className="w-1/5 grid justify-center items-center text-start">
        <h1 className="text-slate-300">Vuelta: {departureDate}</h1>
        <div className="w-full flex justify-center items-center gap-2">
          <div className="flex gap-2 text-slate-400">
            <h2 >{destination.IATA_code}</h2>
            <span>{departure_time} ➨</span>
          </div>
          <div className="flex gap-2 text-slate-400">
            <h2>{origin.IATA_code}</h2>
            <span>{arrival_time}</span>
          </div>
        </div>
      </div>

      <div className="w-[10%] flex justify-center items-center text-start">
        <h1 className="text-slate-300">Pasajeros: {travelers}</h1>
      </div>

      <div className="w-1/5 grid justify-center items-center text-start">
        <h1 className="text-slate-300">Total para {travelers} pasajeros</h1>
        <span className="text-slate-400">${totalPrice}</span>
      </div>

      {/* <div className="grid justify-center items-center text-start p-2 border border-red-700">
        <button type="button" className="w-full h-full p-2 hover:bg-slate-200" onClick={handleClick}>CONTINUAR</button>
      </div> */}

    </div>
  );
};

export default TotalFooter;
