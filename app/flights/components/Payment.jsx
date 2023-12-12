"use client";

import { useContext, useEffect, useState } from "react";
import { FlightContext } from "../FlightContext";
import Image from "next/image";
import { LockFilled } from "@ant-design/icons"
import { Modal } from "antd";


const Payment = () => {
  const { handleCurrentStep, handleChangeInvoice, invoice: { travelers } } = useContext(FlightContext);

  const inputContainerStyles = "w-full p-2 grid grid-cols-1 justify-start items-center gap-2"
  const inputStyles = "w-full col-span-1 h-14 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider"
  const labelStyles = "text-lg text-slate-300"

  const handleInputChange = () => {}

  const handleSubmit = (e) => {

    e.preventDefault()
    
    const formData = new FormData(e.currentTarget);

    const cardholder = formData.get("cardholder");
    const card_number = formData.get("card-number");
    let expiration_month = formData.get("expiration-month");
    const expiration_year = formData.get("expiration-year");

    const cvv = formData.get("cvv");
    const country = formData.get("country");
    const state = formData.get("state");
    const city = formData.get("city");
    const postal_code = formData.get("postal-code");
    const billing_address = formData.get("billing-address");

    // Validate expiration date
    expiration_month = expiration_month.padStart(2, '0');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Se suma 1 porque en JavaScript los meses van de 0 a 11

    const enteredYear = parseInt(expiration_year, 10);
    const enteredMonth = parseInt(expiration_month, 10);

    if (
      !(
        expiration_month.length === 2 &&
        expiration_year.length === 4 &&
        /^\d+$/.test(expiration_month) &&
        /^\d+$/.test(expiration_year) &&
        enteredMonth <= 12 &&
        enteredYear >= currentYear &&
        (enteredYear !== currentYear || enteredMonth >= currentMonth)
      )
    ){
      return Modal.warning({
        title: "Atención, La fecha de expiración no es válida",
        content: (<div>Verifique que el año y el mes sean correctos y que sea vigente</div>),
        onOk() {},
        okButtonProps: { className: " w-20 bg-sky-700 text-slate-200"}
      });
    }

    let expiration_date = `${expiration_month}/${expiration_year}`

    const billing = { cardholder, card_number, expiration_date, cvv, country, state, city, postal_code, billing_address }

    handleChangeInvoice( { billing } );
    handleCurrentStep(5);
  }

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = require('@/db/countries.json');
        const { countries } = data;
        setCountries(countries);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="w-full h-auto grid grid-cols-1 items-start gap-7">
        <div className="w-full h-10 flex justify-between items-center">
          <div className="h-full grid justify-start items-center gap-2">
            <h1 className="text-2xl text-slate-300 text-start">
              Hazlo Oficial! Ingresa los datos de facturación
            </h1>
          </div>
          <button
            type="submit"
            className="w-52 bg-[#9EC8B9] text-[#1B4242] text-center p-2 rounded-md hover:brightness-75 transition-all"
          >
            CONTINUAR
          </button>
        </div>
        <div className="w-full h-full grid grid-cols-2 items-start gap-4 rounded-md shadow-md p-5 bg-[#1B4242]">
          <div className="w-full h-full col-span-1 flex flex-col justify-start items-start gap-2">
              <h1 className="text-lg underline underline-offset-4 p-2 text-slate-300">Detalles de Pago</h1>
              <div className="w-full h-full">
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="cardholder">Titular tarjeta</label>
                      <input type="text" name="cardholder" id="cardholder" className={inputStyles} placeholder="Digitar titular de tarjeta..." onChange={handleInputChange} required/>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="card-number">Número de tarjeta (13-19 dígitos)</label>
                      <input type="text" name="card-number" id="card-number" inputMode="numeric" pattern="^[0-9]{13,19}$"
                       className={inputStyles} placeholder="Digitar número de tarjeta..." onChange={handleInputChange} title="Número de tarjeta válido de 13 a 19 dígitos" required
                       onInput={(e) => {
                        if (e.target.value.length <= 19) {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                        } else e.target.value = e.target.value.slice(0, 19);
                      }}
                       />
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="expiration-month">Fecha de expiración</label>
                      <div className="w-full flex gap-2">
                      <input type="number" min={1} max={12}
                        name="expiration-month" id="expiration-month" className={inputStyles} placeholder="MM..." onChange={handleInputChange} required/>
                      <input type="number" min={new Date().getFullYear()} max={9999}
                       onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                        if (e.target.value.length > 4) {
                          e.target.value = e.target.value.slice(0, 4);
                        }
                      }}  name="expiration-year" id="expiration-year" className={inputStyles} placeholder="YYYY..." onChange={handleInputChange} required/>
                      </div>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="cvv">Código de seguridad (CVV 3-4 dígitos)</label>
                      <input type="text" name="cvv" id="cvv" className={inputStyles} placeholder="Digitar CVV..." onChange={handleInputChange} required
                        pattern="^[0-9]{3,4}$" title="CVV válido de 3 a 4 dígitos" 
                        onInput={(e) => {
                          if (e.target.value.length <= 4) {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          } else e.target.value = e.target.value.slice(0, 4);
                        }}
                      />
                  </div>
              </div>
              <div className="w-full h-full grid justify-center items-start gap-2 p-2">
                  <div className="w-full h-[80px] overflow-hidden flex justify-start items-center gap-10">
                      <Image src={"/icons/mastercard.svg"} width={70} height={70} alt="mastercard"/>
                      <Image src={"/icons/visa.svg"} width={80} height={80} alt="visa"/>
                      <Image src={"/icons/american-express.svg"} width={80} height={80} alt="american-express"/>
                      <Image src={"/icons/discover.svg"} width={80} height={80} alt="discover"/>
                  </div>
                  <div className="w-full h-auto grid justify-center items-start">
                    <h1 className="text-slate-300 text-sm flex gap-2 text-left">Tu seguridad es nuestra prioridad <LockFilled /> </h1>
                    <p className="text-slate-400 text-xs">Tus datos están protegidos y encriptados para garantizar una experiencia de reserva segura</p>
                  </div>
              </div>
          </div>
          <div className="w-full h-auto col-span-1 flex flex-col justify-start items-start gap-2">
            <h1 className="text-lg underline underline-offset-4 p-2 text-slate-300">Detalles de Envío</h1>
              <div className="w-full h-full">
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="country">País</label>
                      <select name="country" id="country" className={inputStyles} required>
                        <option className="bg-[#1B4242]" value="" selected>Seleccionar país</option>
                        {countries.map( (country, index) => (
                          <option className="bg-[#1B4242] hover:bg-[#163636] transition-all" key={index} value={country.es_name}>{country.es_name}</option>
                        ))}
                      </select>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="state">Estado</label>
                      <input type="text" name="state" id="state" className={inputStyles} placeholder="Digitar nombre del estado..." onChange={handleInputChange} required/>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="city">Ciudad</label>
                      <input type="text" name="city" id="city" className={inputStyles} placeholder="Digitar nombre de ciudad..." onChange={handleInputChange} required/>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="postal-code">Código postal</label>
                      <input type="text" name="postal-code" id="postal-code" className={inputStyles} placeholder="Digitar código postal..." onChange={handleInputChange} required/>
                  </div>
                  <div className={inputContainerStyles}>
                      <label className={labelStyles} htmlFor="billing-address">Dirección de envío</label>
                      <textarea name="billing-address" id="billing-address" cols="30" rows="10" className={inputStyles + " h-32 resize-none"}  placeholder="Digitar dirección de envío exacta (Localidad, calle y número de casa)..." required></textarea>
                  </div>
              </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
