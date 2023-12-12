"use client";

import { useContext } from "react";
import FlightCard from "./widgets/FlightCard";
import { FlightContext } from "../FlightContext";
import { calculateFlightPrice } from "@/app/scripts/FlightPrice";

const FlightSelector = ( { data } ) => {

  const { origin, destination, airlines, schedules, departureDate, returnDate, distance, duration, travelers } = data

  const flightData = {...data }
  delete flightData.airlines
  delete flightData.schedules

  return (
    <div className="w-full h-auto rounded-md shadow-md grid grid-cols-1 justify-start items-start gap-8">
      {airlines.length === 0 ? (
        <h1 className="text-lg text-slate-300"> No hay vuelos disponibles para esta fecha</h1>
      ) : (
        airlines.map((airline, index) => {
          const flight = {
            ...flightData,
            airline: airline,
            departure_time: schedules[index].departure_time,
            price: calculateFlightPrice(distance)
          };
          return <FlightCard key={airline._id} flight={flight} />;
        })
      )}
    </div>
  );
};

export default FlightSelector;
