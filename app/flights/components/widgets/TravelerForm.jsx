"use client"

const TravelerForm = ( { traveler, handleFormChange } ) => {

    const inputContainerStyles = "w-full p-3 grid grid-cols-1 justify-start items-center gap-2"
    const inputStyles = "w-[60%] col-span-1 h-16 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider"
    const labelStyles = "text-lg text-slate-300"

    const handleInputChange = (e) => {
        const field = e.target.name.split("-")[0]
        const value = e.target.value
        handleFormChange( traveler, { [field]: value } )
    } 

  return (
    <div className="w-full h-full shadow-md rounded-md p-2 grid grid-cols-1 items-start bg-[#1B4242]">
        <div className={inputContainerStyles}>
            <label htmlFor={`firstname-${traveler}`} className={labelStyles}>Nombre</label>
            <input type="text" name={`firstname-${traveler}`} id={`firstname-${traveler}`} className={inputStyles} placeholder="Digitar nombre..." onChange={handleInputChange} />
        </div>
        <div className={inputContainerStyles}>
            <label htmlFor={`lastname-${traveler}`} className={labelStyles}>Apellidos</label>
            <input type="text" name={`lastname-${traveler}`} id={`lastname-${traveler}`} className={inputStyles} placeholder="Digitar apellidos..." onChange={handleInputChange} />
        </div>
        <div className={inputContainerStyles}>
            <label htmlFor={`email-${traveler}`} className={labelStyles}>Correo electrónico</label>
            <input type="email" name={`email-${traveler}`} id={`email-${traveler}`} className={inputStyles} placeholder="Digitar correo electrónico..." onChange={handleInputChange} />
        </div>
        <div className={inputContainerStyles}>
            <label htmlFor={`phone-${traveler}`} className={labelStyles}>Teléfono</label>
            <input type="number" name={`phone-${traveler}`} id={`phone-${traveler}`} className={inputStyles} placeholder="Digitar teléfono..." onChange={handleInputChange} />
        </div>
    </div>
  );
};

export default TravelerForm;
