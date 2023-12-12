"use client";

import { TRANSLATE_MODELS } from "@/db/translatedModels";
import { Collapse, Modal } from "antd";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

  const [models, setModels] = useState([])
  const [modelsChecked, setModelsChecked] = useState({})
  const [error, setError] = useState("");

  const router = useRouter()

  const inputStyles = "w-[70%] col-span-1 h-16 bg-transparent border border-slate-400 rounded-md outline-none p-2 pl-5 shadow-md text-slate-200 tracking-wider"

  const handleCheck = (e, model) => {
    const isChecked = e.target.checked
    const value = e.target.value

    if (value === "all" ){
      const permissions = ["create", "read", "update", "delete"]
      if (isChecked){
        setModelsChecked( {...modelsChecked, [model]: permissions })
      } else {
        const copy = {...modelsChecked}
        delete copy[model]
        setModelsChecked(copy)
        return
      }
      return
    }

    const modelFound = modelsChecked[model] || []

    if (modelFound){
      if (modelFound.includes(value) && modelFound.length === 1){
        const copy = {...modelsChecked}
        delete copy[model]
        setModelsChecked(copy)
        return
      }
      setModelsChecked( { ...modelsChecked, [model]: modelFound.includes(value) ? modelFound.filter( (v) => v !== value) : [...modelFound, value] } )
    }
    else setModelsChecked( {...modelsChecked, [model]: [value] } )
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const role_name = formData.get("role_name");
      const description = formData.get("description");

      const response = await axios.post("/api/roles", { role_name, description, permissions: modelsChecked });

      const { _id } = await response.data

      Modal.success({
        title: "Rol de usuario agregado",
        content: (<div>Identificador de rol: <b>{_id}</b></div>),
        onOk() {
          router.replace("/admin/roles")
        },
        okButtonProps: { className: " w-20 bg-green-700 text-slate-200"}
      });
      
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message ?? error.message);
      } else setError(error.message);
    }
  };

  useEffect( () => {
    const getModels = async() => {
      try {
        const response = await axios.get("/api/collections")
        const { model_names } = await response.data
        setModels(model_names || [])
      } catch (error) {
        console.error(error)
      }
    }

    getModels()

  }, [])

  const items = Array.from({ length: models.length }, (_, index) => ({
    key: `${index + 1}`,
    label: ( 
      <div className="w-full h-10 flex justify-between items-center bg-[#1B4242] border border-slate-400 p-2 rounded-md">
        <span className="text-slate-300">{ TRANSLATE_MODELS[models[index]] || models[index] }</span>
      </div>
    ),
    children: (
      <div className="rounded-md p-5 grid grid-cols-2 justify-between items-start gap-2 bg-[#1B4242] border border-slate-400">
        <div className="col-span-1 bg-[#1B4242]">
          <div className="w-full flex justify-start gap-3">
            <label htmlFor={`${models[index]}-create`} className="text-slate-300">Crear</label>
            <input type="checkbox" name={`${models[index]}-create`} id={`${models[index]}-create`} value="create" checked={ modelsChecked[models[index]]?.includes("create") ?? false } onChange={ (e) => { handleCheck(e, models[index]) }} />
          </div>
          <div className="w-full flex justify-start gap-3">
            <label htmlFor={`${models[index]}-read`} className="text-slate-300">Leer</label>
            <input type="checkbox" name={`${models[index]}-read`} id={`${models[index]}-read`} value="read" checked={ modelsChecked[models[index]]?.includes("read") ?? false} onChange={ (e) => { handleCheck(e, models[index]) }}/>
          </div>
          <div className="w-full flex justify-start gap-3">
            <label htmlFor={`${models[index]}-update`} className="text-slate-300">Modificar</label>
            <input type="checkbox" name={`${models[index]}-update`} id={`${models[index]}-update`} value="update" checked={ modelsChecked[models[index]]?.includes("update") ?? false} onChange={ (e) => { handleCheck(e, models[index]) }}/>
          </div>
          <div className="w-full flex justify-start gap-3">
            <label htmlFor={`${models[index]}-delete`} className="text-slate-300">Eliminar</label>
            <input type="checkbox" name={`${models[index]}-delete`} id={`${models[index]}-delete`} value="delete" checked={ modelsChecked[models[index]]?.includes("delete") ?? false } onChange={ (e) => { handleCheck(e, models[index]) }}/>
          </div>
          {models[index] === "users" && 
            <div className="w-full flex justify-start gap-3">
              <label htmlFor={`${models[index]}-profile`} className="text-slate-300">Lectura/escritura perfil</label>
              <input type="checkbox" name={`${models[index]}-profile`} id={`${models[index]}-profile`} value="profile" checked={ modelsChecked[models[index]]?.includes("profile") ?? false } onChange={ (e) => { handleCheck(e, models[index]) }}/>
            </div>
          }
        </div>
        <div className="col-span-1 flex justify-end items-center gap-3 bg-transparent">
            <label htmlFor={`check-all-${index}`} className="text-slate-300">Marcar todo</label>
            <input type="checkbox" name={`check-all-${index}`} id={`check-all-${index}`} value="all" checked={ modelsChecked[models[index]]?.length === 4 ?? false } onClick={ (e) => { e.stopPropagation(); handleCheck(e, models[index]) }} />
        </div>
      </div>
    ),
  }));  

  return (
    <div className="w-full min-h-screen h-auto bg-[#092635] grid grid-cols-1 p-5 justify-start items-center gap-5">
      <h1 className="text-slate-300 text-center text-xl tracking-wide">Creación de roles y permisos</h1>
      <form onSubmit={handleSubmit} className="w-3/5 grid gap-5 bg-[#1B4242] rounded-md shadow-md p-10 m-auto">
        <div className="grid gap-2 rounded-md">
          
          <label htmlFor="role_name" className="text-slate-300">Nombre del rol</label>
          <input
            type="text"
            name="role_name"
            id="role_name"
            placeholder="Digitar nombre de rol..."
            className={inputStyles}
            required
          />

          <label htmlFor="description" className="text-slate-300">Descripción</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Digitar descripción..."
            className={inputStyles}
            required
          />

        </div>

        <div className="w-full grid gap-2 rounded-md">
          <h1 className="text-sm text-slate-300">Recursos</h1>
          <p className="text-xs text-slate-400">Marcar uno o varios permisos de cada grupo</p>
          <Collapse items={items} ghost style={ { border: "1px solid #94a3b8", padding: 0 } }/>
        </div>

        <input type="submit" className="w-40 h-10 bg-[#9EC8B9] text-[#1B4242] p-2 mt-4 cursor-pointer rounded-md hover:brightness-75 transition-all text-center uppercase" value="CREAR ROL" />

        <span>{error}</span>
      </form>
    </div>
  );
}
