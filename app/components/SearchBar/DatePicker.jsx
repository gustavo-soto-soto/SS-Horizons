import { CheckOutlined } from "@ant-design/icons";

const getNextDay = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const DatePicker = ( { selectedValue="", handleSetValue=function(){} } ) => {

  const nextDay = getNextDay();

  return (
    <div className="w-full h-full relative">
      <div className="w-full flex-col justify-start items-center gap-2">
        <label
          htmlFor="input-departure-date"
          className="w-full text-slate-200"
        >
           {handleSetValue.name.includes("Departure") ? "Fecha Salida" : "Fecha Regreso" } 
        </label>
        <div className="w-full flex justify-between items-center gap-4 mt-2">
          <input
            id="input-departure-date"
            type="date"
            className="w-80 whitespace-nowrap overflow-hidden overflow-ellipsis outline-none bg-[#1B4242] p-2 rounded-md shadow-md text-slate-200"
            autoComplete="off"
            value={selectedValue}
            onChange={ (e) => { handleSetValue(e.target.value) } }
            min={nextDay}
          />
          <div className="w-10">{ selectedValue && <CheckOutlined />}</div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
