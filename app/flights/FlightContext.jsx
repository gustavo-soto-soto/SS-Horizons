"use client";

import { createContext, useState } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleCurrentStep = (step) => setCurrentStep(step);

  const [invoice, setInvoice] = useState({})
  const handleChangeInvoice = (props) => setInvoice( (invoice) => ({...invoice, ...props}) )

  const [totalPrice, setTotalPrice] = useState(0)

  const handleCalculatePrice = () => {
    if (Object.entries(invoice).length >= 1){
      const { price, travelers, luggage, seats } = invoice
      let totalPerTravel = price * travelers
      let totalLuggage = getTotalLuggage()
      let totalSeats = getTotalSeats()

      const totalFlight =  parseFloat( ( totalPerTravel + totalLuggage + totalSeats).toFixed(2) )

      setTotalPrice(totalFlight)
    }
  }

  const getTotalLuggage = () => {
    const { luggage } = invoice
    let totalLuggage = 0
    if ( luggage ){
      totalLuggage = luggage.reduce( (acum, obj) => { //SUM ALL TOTAL LUGGAGE VALUES
        return acum + obj.total;
      }, 0)
    }

    return totalLuggage
  }

  const getTotalSeats = () => {
    const { seats } = invoice
    let totalSeats = 0
    if ( seats ){
      totalSeats = seats.reduce( (acum, obj) => { //SUM ALL TOTAL LUGGAGE VALUES
        return acum + obj.price;
      }, 0)
    }

    return totalSeats
  }

  return (
    <FlightContext.Provider value={{ currentStep, handleCurrentStep, invoice, handleChangeInvoice, totalPrice , handleCalculatePrice, getTotalLuggage, getTotalSeats }}>
      {children}
    </FlightContext.Provider>
  );
};
