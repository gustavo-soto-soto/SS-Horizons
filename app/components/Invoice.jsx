"use client"

import Image from "next/image";

const Invoice = ( { data } ) => {
  
  const { airline={}, origin={}, destination={}, departureDate="",
  departure_time="", returnDate="", travelerData={}, luggage={},
  total_luggage=0, seats={}, total_seats=0, travelers=0, price=0, total_price=0 } = data

  return <div className="w-full h-full grid grid-cols-1 rounded-md shadow-md bg-[#1B4242] p-5 gap-2">
  <div className="col-span-1 w-full grid grid-cols-4 justify-between p-2">
    <div className="col-span-1 justify-start items-center text-slate-300 tracking-wide flex">SS HORIZONS 
    <Image
      src={"/ss-horizons-icon.svg"}
      width={40}
      height={40}
      className="relative"
      alt="SS horizons Icon"
    /> </div>
    <div className="col-span-3 grid justify-end text-slate-300 tracking-wide">
      {airline.airline_name} ({airline.IATA_code})
    </div>
  </div>
  <div className="col-span-1 w-full grid grid-cols-2 justify-between p-2 border-t border-slate-400">
    <div className="col-span-1 grid justify-start">
      <h1 className="text-slate-300">
        {origin.airport_name} ({origin.IATA_code})
      </h1>
      <h2 className="text-slate-400">
        {origin.city}, {origin.country}
      </h2>
    </div>
    <div className="col-span-1 grid justify-end">
      <h1 className="text-slate-300">
        {destination.airport_name} ({destination.IATA_code})
      </h1>
      <h2 className="text-slate-400">
        {destination.city}, {destination.country}
      </h2>
    </div>
  </div>
  <div className="col-span-1 w-full grid grid-cols-2 justify-between p-2 border-t border-slate-400">
    <div className="col-span-1 grid justify-start">
      <h1 className="text-slate-300">
        Vuelo de ida: {origin.IATA_code} - {destination.IATA_code}
      </h1>
      <h2 className="text-slate-400 text-start">{departureDate}</h2>
      <h4 className="text-slate-400 text-start">{departure_time}</h4>
    </div>
    <div className="col-span-1 grid justify-end">
      <h1 className="text-slate-300">
        Vuelo de vuelta: {destination.IATA_code} - {origin.IATA_code}
      </h1>
      <h2 className="text-slate-400 text-end">{returnDate}</h2>
      <h4 className="text-slate-400 text-end">{departure_time}</h4>
    </div>
  </div>

  <h1 className="text-slate-300 mt-2 tracking-wide">Datos de pasajeros</h1>
  <div className="w-full grid grid-cols-1 border border-slate-400 rounded-md">
    <table className="w-full col-span-1">
      <tr className="w-full border-b border-slate-400">
        <th className="border-r p-2 text-slate-300 font-normal text-start">Pasajero #</th>
        <th className="border-r p-2 text-slate-300 font-normal text-start">Nombre</th>
        <th className="border-r p-2 text-slate-300 font-normal text-start">Apellidos</th>
        <th className="border-r p-2 text-slate-300 font-normal text-start">Correo electrónico</th>
        <th className="p-2 text-slate-300 font-normal text-start">Teléfono</th>
      </tr>
      {travelerData.map((traveler, travelerIndex) => (
        <tr key={travelerIndex} className="w-full">
          <td className="border-r p-2 text-slate-300 text-start">{travelerIndex + 1}</td>
          <td className="border-r p-2 text-slate-300 text-start">{traveler.firstname}</td>
          <td className="border-r p-2 text-slate-300 text-start">{traveler.lastname}</td>
          <td className="border-r p-2 text-slate-300 text-start">{traveler.email}</td>
          <td className="p-2 text-slate-300 text-start">{traveler.phone}</td>
        </tr>
      ))}
    </table>
  </div>
  <h1 className="text-slate-300 mt-2 tracking-wide">Detalle de facturación</h1>
  <div className="w-full grid grid-cols-1 border border-slate-400 rounded-md p-5">
    <table className="w-full col-span-1 mb-5">
      <tr className="w-full border border-slate-400">
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Tipo equipaje</th>
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Cantidad</th>
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Costo por unidad</th>
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Total</th>
      </tr>
      {luggage.map((luggage, luggageIndex) => (
        <tr key={luggageIndex} className="w-full border border-slate-400">
          <td className="border-r p-2 text-slate-300 text-start">{luggage.luggage_type}</td>
          <td className="border-r p-2 text-slate-300 text-start">{luggage.count}</td>
          <td className="border-r p-2 text-slate-300 text-start">${luggage.total / luggage.count}</td>
          <td className="border-r p-2 text-slate-300 text-start">${luggage.total}</td>
        </tr>
      ))}
      <tfoot>
        <tr className="border p-2 border-slate-400 grid-cols-4">
          <th className="p-2" colSpan={3}><h1 className="text-start text-slate-300 font-normal">Total</h1></th>
          <td colspan="2" className="col-span-1 text-start text-slate-300 border-l border-slate-400">
            <h1 className="pl-2">${total_luggage}</h1>
          </td>
        </tr>
      </tfoot>
    </table>
    <table className="w-full col-span-1 border">
      <tr className="w-full border-b border-slate-400">
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Pasajero</th>
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Asiento</th>
        <th className="border-r border-slate-400 p-2 text-slate-300 font-normal text-start">Total</th>
      </tr>
      {seats.map((seat, seatIndex) => (
        <tr key={seatIndex} className="w-full">
          <td className="border-r border-slate-400 p-2 text-slate-300 text-start">{seatIndex + 1}</td>
          <td className="border-r border-slate-400 p-2 text-slate-300 text-start">{seat.seat}</td>
          <td className="border-r border-slate-400 p-2 text-slate-300 text-start">${seat.price}</td>
        </tr>
      ))}
      <tfoot>
        <tr className="p-2 border-slate-400 grid-cols-3 border-t">
        <th className="p-2" colSpan={2}><h1 className="text-start text-slate-300 font-normal">Total</h1></th>
        <td colspan="1" className="col-span-1 text-start text-slate-300 border-l border-slate-400">
            <h1 className="pl-2">${total_seats}</h1>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
  <div className="w-full col-span-1 grid grid-cols-2 border border-slate-400 rounded-lg">
    <div className="col-span-1 w-full grid grid-cols-2 p-2 justify-between border-r border-slate-400">
      <h1 className="text-slate-300">
        Tarifa {origin.IATA_code} - {destination.IATA_code}
      </h1>
      <h1 className="text-end text-slate-300">${price}</h1>
    </div>
    <div className="col-span-1 w-full grid grid-cols-2 p-2 justify-between">
      <h1 className="text-slate-300 pl-5">
        Tarifa {destination.IATA_code} - {origin.IATA_code}{" "}
      </h1>
      <h1 className="text-end text-slate-300 pr-2">Gratis</h1>
    </div>
    <div className="col-span-2 w-full grid grid-cols-2 border-t border-slate-400 p-2 justify-between">
      <h1 className="text-slate-300">Total para {travelers} pasajeros:</h1>
      <h1 className="text-end text-slate-300">${total_price}</h1>
    </div>
  </div>
</div>
};

export default Invoice;
