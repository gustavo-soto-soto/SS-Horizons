import Link from "next/link";

export default function Page() {
    return (
      <div className="grid grid-cols-1 min-h-screen bg-[#092635] items-center justify-start text-start p-24 gap-10">
        <h1 className="text-3xl text-slate-200">SS HORIZONS</h1>
        <p className="text-2xl text-slate-300" >Sistema de reservas de vuelos en línea</p>

        <hr className="w-full"/>

        <h2 className="text-2xl text-slate-200">Gustavo Soto Soto</h2>
        <p className="text-xl text-slate-300">gustavosotosoto2000@gmail.com</p>
        <p className="text-xl text-slate-300">luis.soto.soto@cuc.cr</p>

        <hr className="w-full"/>

        <Link className="text-slate-200 underline underline-offset-4 hover:text-slate-300 transition-all" href={"https://cr.linkedin.com/in/gustavo-soto-soto"} target="_blank">https://cr.linkedin.com/in/gustavo-soto-soto</Link>
        <Link className="text-slate-200 underline underline-offset-4 hover:text-slate-300 transition-all" href={"https://github.com/gustavo-soto-soto"} target="_blank">https://github.com/gustavo-soto-soto</Link>

        <p className="text-slate-300" >Copyright @2022</p>
      </div>
    )
  }
  