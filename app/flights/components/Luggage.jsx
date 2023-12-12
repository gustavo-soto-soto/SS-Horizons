"use client";

import { useContext, useEffect, useState } from "react";
import { FlightContext } from "../FlightContext";
import axios from "axios";
import { Spin } from 'antd';

const Luggage = () => {
  const { handleCurrentStep, handleChangeInvoice } = useContext(FlightContext);

  const [luggageList, setLuggageList] = useState([]);
  const [luggageTotal, setLuggageTotal] = useState([]);
  const [luggageLoading, setLuggageLoading] = useState(false)

  useEffect(() => {
    const getLuggageData = async () => {
      try {
        setLuggageLoading(true)

        const response = await axios("api/luggages");

        const data = await response.data;

        setLuggageList(data);
      } catch (error) {
        console.log(error);
      } finally{
        setLuggageLoading(false)
      }
    };

    getLuggageData();
  }, []);

  const handleChange = (e) => {
    const luggage_type = e.target.name
    const count = e.target.value

    if (count == 0 ){
      const updatedLuggage = luggageTotal.filter( (lugg) => lugg.luggage_type !== luggage_type)
      setLuggageTotal(updatedLuggage)
    } 
    else{
      const costPerUnit = luggageList.find( (lugg) => lugg.luggage_name === luggage_type).unit_price || 0
      const total = count * costPerUnit
      const luggageFound = luggageTotal.find( (lugg) => lugg.luggage_type === luggage_type)
      if (luggageFound){ //IF EXISTS
        setLuggageTotal((luggageTotal) => luggageTotal.map( (lugg) => lugg.luggage_type === luggage_type ? { ...lugg, count, total } : lugg ));
      }
      else{
        const newLuggage = { luggage_type, count, total}
        setLuggageTotal((luggageTotal) => [ ...luggageTotal, newLuggage ]);
      }
    }
  };

  const handleClick = (e) => {
    handleChangeInvoice({luggage: luggageTotal})
    handleCurrentStep(2)
  }

  return (
    <div className="w-full h-full grid grid-cols-1 items-start gap-10">
      <div className="w-full h-10 flex justify-between items-center">
        <div className="grid">
          <h1 className="text-2xl text-slate-300 text-start">Elige las maletas que se adapten a tu viaje!</h1>  
          <p className="text-slate-400 text-sm">Si omite equipaje, toda maleta debe ser cancelada en el aeropuerto</p>

        </div>
        <button className="w-52 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all" onClick={handleClick}>CONTINUAR</button>
      </div>
      <div className="w-full h-auto min-h-[550px] grid grid-cols-3 justify-start items-start gap-8">
        {luggageLoading ? <Spin size="large" className="col-span-3 mt-20"/> :
          luggageList.map((lugg) => (
            <div
              key={lugg._id}
              className="w-full h-64 grid grid-cols-1 justify-start items-center p-5 shadow-md bg-[#1B4242] rounded-md hover:scale-105 transition-all cursor-pointer"
            >
              <div className="w-full border-b border-slate-400 grid col-span-1 justify-start items-center gap-3 p-5">
                <h1 className="text-slate-300">{lugg.luggage_name}</h1>
                <p className="text-sm text-slate-400">{lugg.description}</p>
                <h3 className="text-sm text-slate-400">
                  Tarifa por unidad: ${lugg.unit_price}
                </h3>
              </div>

              <div className="w-full col-span-1 flex justify-start items-center gap-5 p-5">
                <label className="text-slate-300" htmlFor={lugg.luggage_name}>
                  Cantidad:{" "}
                </label>
                <input
                  className="whitespace-nowrap overflow-hidden overflow-ellipsis outline-none bg-[#1B4242] border border-slate-400 p-2 rounded-md shadow-md text-slate-200 text-center"
                  type="number"
                  id={lugg.luggage_name}
                  name={lugg.luggage_name}
                  min={0}
                  max={10}
                  onChange={handleChange}
                  defaultValue={0}
                  //value={luggageTotal?.[lugg.luggage_name] || 0}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Luggage;
