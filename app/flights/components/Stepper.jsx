"use client"

import { Steps } from 'antd';
import { BoxPlotOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { useContext  } from 'react';
import { FlightContext } from '../FlightContext';
import FlightSelector from './FlightSelector';
import Luggage from './Luggage';
import Seats from './Seats';
import TotalFooter from './TotalFooter';
import DataForms from './DataForms';
import Payment from './Payment';
import Summary from './Summary';
import Image from 'next/image';

const Stepper = ( { data } ) => {

  const { currentStep, handleCurrentStep, invoice } = useContext(FlightContext)
  const handleChange = (value) => handleCurrentStep(value);

  const items = [
    {
      title: (<div className="text-slate-300">Escoge tu vuelo</div>),
      status: currentStep > 0 ? "finish" : "process",
      icon: <Image src={"/icons/flight-ticket.svg"} width={30} height={30} alt="step-choose" />,
      
    },
    {
      title: (<div className="text-slate-300">Equipaje</div>),
      status: currentStep === 1 ? "process" : (currentStep < 1 ? "wait" : "finish"),
      disabled: currentStep < 1,
      icon: <Image src={"/icons/luggage.svg"} width={30} height={30} alt="step-luggage" />,
    },
    {
      title: (<div className="text-slate-300">Asientos</div>),
      status: currentStep === 2 ? "process" : (currentStep < 2 ? "wait" : "finish"),
      disabled: currentStep < 2,
      icon: <Image src={"/icons/seats.svg"} width={30} height={30} alt="step-seats" />,
    },
    {
      title: (<div className="text-slate-300">Datos</div>),
      status: currentStep === 3 ? "process" : (currentStep < 3 ? "wait" : "finish"),
      disabled: currentStep < 3,
      icon: <Image src={"/icons/user-data.svg"} width={30} height={30} alt="step-user-data" />,
    },
    {
      title: (<div className="text-slate-300">Pagos</div>),
      status: currentStep === 4 ? "process" : (currentStep < 4 ? "wait" : "finish"),
      disabled: currentStep < 4,
      icon: <Image src={"/icons/pay.svg"} width={30} height={30} alt="step-pay" />,
    },
    {
      title: (<div className="text-slate-300">Disfruta de tu viaje</div>),
      status: currentStep === 5 ? "process" : (currentStep < 5 ? "wait" : "finish"),
      disabled: currentStep < 5,
      icon: <Image src={"/icons/enjoy-flight.svg"} width={30} height={30} alt="step-enjoy" />,
    },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <FlightSelector data={data} />
      case 1: return <Luggage />
      case 2: return <Seats />
      case 3: return <DataForms />
      case 4: return <Payment />
      case 5: return <Summary />
      default: break;
    }
  }

  return (
    <div className="w-4/5 h-auto grid gap-10 items-start">
      
      <Steps items={items} onChange={handleChange} />

      { renderStep() }

      { Object.entries(invoice).length >= 1 && <TotalFooter /> }

    </div>
  );
};

export default Stepper;
