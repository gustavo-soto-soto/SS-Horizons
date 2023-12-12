import { CheckOutlined } from "@ant-design/icons";

const InputNumber = ( { selectedValue="", handleSetValue=function(){} } ) => {
  return (
    <div className="w-full h-full relative">
      <div className="w-full flex-col justify-start items-center gap-4">
        <label
          htmlFor="input-travelers"
          className="w-full text-slate-200"
        >
          Pasajeros
        </label>
        <div className="w-full flex justify-between items-center gap-4 mt-2">
          <input
            id="input-travelers"
            type="number"
            value={selectedValue}
            onChange={ (e) => { handleSetValue(e.target.value) }}
            placeholder="Número de pasajeros..."
            min={1}
            max={10}
            className="w-80 whitespace-nowrap overflow-hidden overflow-ellipsis outline-none bg-[#1B4242] p-2 rounded-md shadow-md text-slate-200 text-center"
            autoComplete="off"
          />
          <div className="w-10">{ selectedValue && <CheckOutlined />}</div>
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
