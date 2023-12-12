import axios from "axios";
import { shuffleArray } from "../scripts/ShuffleArray";
import Stepper from "./components/Stepper";
import { calculeDistanceCordinates } from "../scripts/Haversine";
import { calculateFlightDuration } from "../scripts/FlightDuration";
import { formatDate } from "../scripts/FormatDate";

async function getAirportData(airportId) {
  try {
    const response = await axios(
      `${process.env.SERVER_URL}//api/airports/${airportId}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getAirlinesData(country) {
  try {
    const response = await axios(
      `${process.env.SERVER_URL}//api/airlines?country=${country}`
    );

    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getSchedulesData() {
  try {
    const response = await axios(`${process.env.SERVER_URL}//api/schedules`);

    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page({ searchParams: { origin, destination, departureDate, returnDate, travelers } }) {
  

  const originAirport = await getAirportData(origin);
  const destinationAirport = await getAirportData(destination);
  const airlines = await getAirlinesData(originAirport.country);
  const schedules = await getSchedulesData();

  const originCoordinates = originAirport.coordinates.replace(/\s/g, "").split(",");
  const destinationCoordinates = destinationAirport.coordinates.replace(/\s/g, "").split(",");

  const distance = calculeDistanceCordinates( originCoordinates, destinationCoordinates);
  const duration = calculateFlightDuration(distance);
  const formattedDepartureDate = formatDate(departureDate);
  const formattedReturnDate = formatDate(returnDate);

  const numberOfCards = Math.floor(Math.random() * airlines.length) + 1;

  // MIX RANDOM ARRAYS AND GENERATE RANDOM NUMBER OF CARDS
  const shuffledAirlines = shuffleArray(airlines).slice(0, numberOfCards);
  const shuffledSchedules = shuffleArray(schedules).slice(0, numberOfCards);

  const FLIGHTS_DATA = {
    origin: originAirport,
    destination: destinationAirport,
    airlines: shuffledAirlines,
    schedules: shuffledSchedules,
    departureDate: formattedDepartureDate,
    returnDate: formattedReturnDate,
    distance,
    duration,
    travelers,
  };

  return (
    <div className="w-full min-h-screen h-auto flex flex-col items-center justify-between relative bg-[#092635]">
      <div className="w-full h-auto flex flex-col items-center justify-between gap-8">
        <div className="w-4/5 flex flex-col justify-start mt-10 gap-2">
          <h2 className="text-2xl text-slate-300 text-start">
            {originAirport.city} - {destinationAirport.city} ({" "}
            {formattedDepartureDate} - {formattedReturnDate} )
          </h2>
          <h2 className="text-slate-400 text-start">
            Distancia: {distance} KM
          </h2>
        </div>
        <Stepper data={FLIGHTS_DATA} />
      </div>

    </div>
  );
}
