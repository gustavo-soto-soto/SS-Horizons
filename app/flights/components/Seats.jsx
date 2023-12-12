"use client";

import { useContext, useEffect, useState } from "react";
import { FlightContext } from "../FlightContext";
import { CloseOutlined } from "@ant-design/icons";

const Seats = () => {
  const { currentStep, handleCurrentStep, handleChangeInvoice, invoice: { travelers }  } = useContext(FlightContext);
  
  const SEATS_DIMENSION = [6, 30]; //ROWS X COLUMNS
  const ENUM_ARRAY = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  ).slice(0, SEATS_DIMENSION[0]); //LETTER ID FOR SEATS
    
  const [seats, setSeats] = useState([]);
  //const [currentSeats, setCurrentSeats] = useState([])

  const [matrix, setMatrix] = useState(() => {
  const basePrice = 70;
  const discountPerRow = 2;
  const discountInterval = 2;
  const additionalDiscountMiddleSeats = 5;
  
  return Array.from({ length: SEATS_DIMENSION[1] }, (_, rowIndex) =>
  Array(SEATS_DIMENSION[0]).fill(0).map((_, colIndex) => {
    const rowDiscount = Math.floor(rowIndex / discountInterval) * discountPerRow;
    
    //discount if not window seat
    const middleSeatsDiscount = colIndex > 0 && colIndex < SEATS_DIMENSION[0] - 1 ? additionalDiscountMiddleSeats : 0;
    
    const price = Math.max(basePrice - rowDiscount - middleSeatsDiscount, 0);
    return price;
  })
  );
  });

  const [currentColor, setCurrentColor] = useState("")

  const handleClickColor = (color) => setCurrentColor(color)
  
  const colors = ["#0284c7" ,"#0d9488" ,"#ea580c" ,"#facc15" ,
  "#16a34a" ,"#4f46e5" ,"#64748b" ,"#b91c1c" ,"#5b21b6" ,"#db2777"].slice(0, travelers)
  
  const handleClickSeat = (row, column, price) => {
    setSeats( [...seats, { row, column, color: currentColor, price } ])
    handleClickColor("")
  };

  const handleRemoveSeat = (color) => {
    setSeats( seats.filter( (s) => s.color !== color )  )
  };

  const handleClick = (e) => {
    const finalSeats = seats.map( ( seat, index ) => {
      const { row, column, price, color } = seat
      const seatNumber = `${row+1}${ENUM_ARRAY[column]}`
      const traveler = colors.findIndex( (c) => c === color)+1
      return { traveler, seat: seatNumber, price }
    } )
    handleChangeInvoice( { seats: finalSeats} )
    handleCurrentStep(3)
  }

  if (currentStep !== 2) return null;

  return (
    <div className="w-full h-auto grid grid-cols-1 justify-center items-center rounded-md gap-8">
      <div className="w-full h-10 flex justify-between items-center">
        <div className="h-full grid justify-start items-center gap-2">
          <h1 className="text-2xl text-slate-300 text-start">Elige tus asientos ¡Tu comodidad, tu elección!</h1>
          <div className="h-2 flex justify-start items-center gap-2">
            {currentColor && <p className="text-slate-400">Color </p> }
            {currentColor && <div className={"rounded-md shadow-md p-2"} style={{backgroundColor: currentColor}}></div>}
          </div>
        </div>
        <button className="w-52 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all disabled:brightness-75 disabled:cursor-not-allowed" onClick={handleClick} disabled={seats.length != travelers}>CONTINUAR</button>
      </div>
      <div className="w-full flex justify-between items-start gap-20">
        <div className={"w-[60%] h-[600px] overflow-auto grid p-5 gap-2 justify-center items-start grid-cols-1 border border-slate-400 rounded-md shadow-md" } >
          <div className="w-10/12 grid justify-center items-center p-20 m-auto border-4 rounded-tr-full rounded-tl-full">
            <div
              className={
                "w-full grid justify-center items-center gap-2 col-span-1 m-auto grid-cols-6 " +
                SEATS_DIMENSION[0]
              }
            >
              {ENUM_ARRAY.slice(0, SEATS_DIMENSION[0]).map((col, colIndex) => (
                <div key={`${col}-${colIndex}`} className="col-span-1 grid justify-center items-center text-slate-300">
                  {col}
                </div>
              ))}
            </div>
            {matrix.map((array, index) => (
              <div
                key={index}
                className={
                  "w-full relative p-2 grid justify-start items-center gap-2 col-span-1 m-auto grid-cols-6 " +
                  SEATS_DIMENSION[0]
                }
              >
                <div className="absolute left-[-20px] text-slate-300">
                  {index + 1}
                </div>
                {array.map((col, colIndex) => {
                  const seatFound = seats.find( (seat) => seat.row === index && seat.column === colIndex)
                  return (
                    <div
                      key={`${col}-${colIndex}`}
                      className={"col-span-1 border rounded-md shadow-md p-2 grid justify-center items-center text-slate-300 cursor-pointer transition-all hover:brightness-75"}
                      style={ { 
                        backgroundColor: seatFound ? seatFound.color : "transparent" ,
                        color: seatFound ? "#e2e8f0" : ""
                      }}
                      onClick={() => {
                        if (!currentColor || seatFound) return
                        handleClickSeat(index, colIndex, col);
                      }}
                    >
                      ${col}
                    </div>
                  )
                })}
              </div>
            ))}
           </div>
        </div>
        
        <div className={ "w-[30%] h-auto grid p-5 gap-2 justify-center items-start border border-slate-400 rounded-md shadow-md"}>
          <div className="w-full h-auto flex flex-col justify-center items-start gap-5">
            <p className="text-sm text-slate-300 text-start">Seleccione un color y luego el asiento en la silueta del avión </p>
            { colors.map( (color, index) => {

              const seatFound = seats.find( (seat) => seat.color === color)
              let seat = ""

              if (seatFound){
                seat = `${seatFound.row+1}${ENUM_ARRAY[seatFound.column]}`
              }
              return (
                <div className="w-full h-10 flex justify-start items-center gap-5" key={`${color}-${index}`}>
                  <div className={"h-10 w-[10%] p-5 rounded-md shadow-md cursor-pointer transition-all hover:brightness-75 " + ( currentColor === color && "brightness-75") }
                    onClick={ () => {
                      if (seatFound) return
                      handleClickColor(color) 
                    } }
                    style={{backgroundColor: color}}
                  >
                  </div>
                  <div className="w-6/12">
                    <h1 className="text-lg text-slate-300">PASAJERO {index+1}</h1>
                  </div>
                  <div className="w-2/5 flex justify-end items-center gap-2">
                    {seatFound ? 
                      <>
                        <h1 className="text-lg text-slate-300">{seat}</h1>
                        <CloseOutlined title="Quitar asiento" className="text-red-600 transition-all hover:scale-110 hover:text-red-700" onClick={()=> { handleRemoveSeat(color) }}/> 
                      </>
                    : <h1 className="text-slate-300">Sin asignar</h1>
                    }
                    </div>
                </div>
              )
            }) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
