import SearchBar from "./components/SearchBar";

export default function Home () {

  return (
    <main className="w-full h-screen flex flex-col items-center justify-between min-h-full gap-20 bg-[#092635] max-sm:h-auto">
      <div className="w-full h-4/5 flex flex-col items-center justify-between gap-20">
        <div className="w-[90%] h-1/2 flex flex-col justify-start mt-20 gap-5 bg-[#1B4242] p-10 rounded-md shadow-md max-sm:h-full">
          <h1 className="text-4xl text-slate-200 text-start">
            Descubre el mundo con nosotros!
          </h1>
          <p className="text-slate-300 text-start">
            Cotiza tus vuelos ahora y encuentra las mejores ofertas que se adaptan a tu estilo de viaje 
          </p>
          <SearchBar />
        </div>
        <div className="min-w-full min-h-[500px] flex justify-center items-center border-t border-slate-400 p-10 bg-cover bg-center filter max-sm:hidden" style={{"background-image": "url('/images/bg-ss-horizons.png')"}}>

          <div className="h-full w-2/5 bg-[#0926359c] rounded-md shadow-md flex flex-col items-start p-5">
            <h1 className="text-5xl text-slate-200 mt-10">La libertad de volar a cualquier lugar está en tus manos!</h1>
            <p className="text-4xl text-slate-300">Explora miles de vuelos y conoce tu próximo destino</p>
          </div>

        </div>
      </div>
    </main>
  );
}
