"use client"

import { useEffect, useState } from "react";
import Autocomplete from "./SearchBar/Autocomplete";
import DatePicker from "./SearchBar/DatePicker";
import InputNumber from "./SearchBar/InputNumber";
import { message } from 'antd';
import Link from "next/link";

const SearchBar = () => {
  
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [travelers, setTravelers] = useState(1)

  const handleOrigin = (value) => setOrigin(value)
  const handleDestination = (value) => setDestination(value)
  const handleDepartureDate = (value) => setDepartureDate(value)
  const handleReturnDate = (value) => setReturnDate(value)
  const handleTravelers = (value) => setTravelers(value)

  const [messageApi, contextHolder] = message.useMessage();

  useEffect( () => {
    if (origin && destination){
      if (origin === destination){
        messageApi.warning("El aeropuerto de origen no puede ser igual al aeropuerto de destino")
      } 
    }
  }, [ origin, destination ])

  useEffect( () => {
    if (departureDate && returnDate) {
      if (new Date(returnDate) <= new Date(departureDate)) {
        messageApi.warning("La fecha de retorno debe ser posterior a la fecha de salida", )
      }
      else messageApi.destroy()
    }
  }, [departureDate, returnDate])


  const disabledButton = !origin || !destination || !departureDate | !returnDate || !travelers || new Date(returnDate) <= new Date(departureDate) || origin === destination

  return (
    <div className="min-w-full h-24 flex justify-start items-center z-40 gap-2">
      {contextHolder}
      <div className="w-[24%] max-sm:w-full h-full bg-[#5C8374] p-2 rounded-md shadow-md">
        <Autocomplete key={"airport-origin"} selectedValue={origin} handleSetValue={handleOrigin} />
      </div>
      <div className="w-[24%] max-sm:w-full h-full bg-[#5C8374] p-2 rounded-md shadow-md">
        <Autocomplete key={"airport-destination"} selectedValue={destination} handleSetValue={handleDestination} />
      </div>
      <div className="w-[16%] max-sm:w-full h-full bg-[#5C8374] p-2 rounded-md shadow-md">
        <DatePicker key={"departure-date"} selectedValue={departureDate} handleSetValue={handleDepartureDate}/>
      </div>
      <div className="w-[16%] max-sm:w-full h-full bg-[#5C8374] p-2 rounded-md shadow-md relative">
        <DatePicker key={"return-date"} selectedValue={returnDate} handleSetValue={handleReturnDate}/>
      </div>
      <div className="w-[9%] max-sm:w-full h-full bg-[#5C8374] p-2 rounded-md shadow-md">
        <InputNumber selectedValue={travelers} handleSetValue={handleTravelers} />
      </div>
      <div className="w-[8%] max-sm:w-full h-full">
        <Link href={{pathname: "/flights", query: { origin, destination, departureDate, returnDate, travelers }}} legacyBehavior passHref>
          <button 
            type="button" 
            className="w-full h-full bg-blue-700 text-slate-200
            text-center rounded-md hover:bg-blue-800 disabled:cursor-not-allowed transition-all" 
            disabled={disabledButton}
          >
            BUSCAR 
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
