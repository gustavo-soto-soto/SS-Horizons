"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CheckOutlined } from "@ant-design/icons";

const Autocomplete = ( { selectedValue="", handleSetValue=function(){}, airportType="" } ) => {
  const inputRef = useRef();
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/airports?query=${query}`);
        setAirports(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API", error);
      }
    };

    const delayDebounceFn = setTimeout(fetchData, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleClick = () => inputRef.current.select();

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (selectedValue) {
      const currentAirport = airports.find(
        (airport) => airport.airport_name === e.target.value
      );
      if (!currentAirport) handleSetValue("")
    }
  };

  const handleSelect = (value, query) => {
    handleSetValue(value)
    setQuery(query);
  };

  return (
    <div className="w-full min-h-full relative">
      <div className="w-full flex-col justify-start items-center gap-4">
        <label
          htmlFor={`input-airpoirt-${airportType}`}
          className="w-full text-slate-200"
        >
          { airportType === "origin" ? "Origen" : "Destino" }
        </label>
        <div className="w-full flex justify-between items-center gap-4 mt-2">
          <input
            id={`input-airpoirt-${airportType}`}
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="País, ciudad o aeropuerto..."
            onClick={handleClick}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setTimeout(() => setFocused(false), 200);
            }}
            className="w-80 whitespace-nowrap overflow-hidden overflow-ellipsis outline-none bg-[#1B4242] p-2 rounded-md shadow-md text-slate-200"
            autoComplete="off"
          />
          <div className="w-10">
            { selectedValue && <CheckOutlined color="white" />}
          </div>
        </div>
      </div>
      {focused && !selectedValue ? (
        <ul className="w-[500px] h-auto max-h-80 grid justify-start items-center bg-[#1B4242] text-slate-200 shadow-md border border-slate-400 rounded-md overflow-y-auto sticky bottom-0 z-50 mt-5">
          {airports.length === 0 ? (
            <li className="p-2 text-slate-200 text-sm">No hay resultados</li>
          ) : (
            airports.map((airport, key) => (
              <li
                key={airport._id || key}
                className="cursor-pointer p-2 border-b border-slate-400 hover:bg-[#163636] transition-all"
                onClick={() => {
                  handleSelect(
                    airport._id,
                    `${airport.airport_name} (${airport.IATA_code})`
                  );
                }}
              >
                <div className="grid justify-start items-center">
                  <h1 className="text-slate-300">{`${airport.airport_name} (${airport.IATA_code})`}</h1>
                  <h2 className="text-sm text-slate-400">{`${airport.city}, ${airport.country}`}</h2>
                </div>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default Autocomplete;
