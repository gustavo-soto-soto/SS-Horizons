"use client";

import { useContext, useEffect, useState } from "react";
import { FlightContext } from "../FlightContext";
import { Tabs } from "antd";
import TravelerForm from "./widgets/TravelerForm";

const DataForms = () => {
    const { handleCurrentStep, handleChangeInvoice, invoice: { travelers } } = useContext(FlightContext);

    const [ travelerData, setTravelerData ] = useState([])
    
    const onTravelerFormChange = (travelerId, props) => {
        const newTravelerData = travelerData.map( (traveler) => traveler.traveler === travelerId ? ( { ...traveler, ...props } ) : traveler)
        setTravelerData(newTravelerData);
    };
    
    const items = Array.from({ length: travelers }, (_, index) => ({
      key: `${index + 1}`,
      label: <div className="text-slate-300">{`Pasajero ${index + 1}`}</div>,
      children: <TravelerForm key={`traveler-${index+1}`} traveler={index+1} handleFormChange={onTravelerFormChange} />,
    }));
    
    const onChangeTab = (key) => {
        console.log(key);
    };

    const handleClick = (e) => {
      handleChangeInvoice( { travelerData } );
      handleCurrentStep(4);
    };

    useEffect(() => {
        const initialTravelerData = Array.from({ length: travelers }, (_, index) => ({
          traveler: index + 1,
          firstname: "",
          lastname: "",
          email: "",
          phone: 0,
        }));
        setTravelerData(initialTravelerData);
    }, [travelers]);

    const buttonDisabled = travelerData.some((traveler) =>
        Object.values(traveler).some((value) => value === "")
    );

  return (
    <div className="w-full h-full grid grid-cols-1 items-start gap-10">
      <div className="w-full h-10 flex justify-between items-center">
        <div className="h-full grid justify-start items-center gap-2">
          <h1 className="text-2xl text-slate-300 text-start">
            Viaje seguro con la información correcta!
          </h1>
          <p className="text-slate-400 text-start">
            Por favor, completa los datos de los pasajeros
          </p>
        </div>
        <button
          className="w-52 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all disabled:brightness-75 disabled:cursor-not-allowed"
          onClick={handleClick}
          disabled={buttonDisabled}
        >
          CONTINUAR
        </button>
      </div>
      <div className="w-full h-auto grid grid-cols-1 items-start">
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </div>
    </div>
  );
};

export default DataForms;
