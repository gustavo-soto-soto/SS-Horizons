import { TRANSLATE_MODELS } from "@/db/translatedModels"
import NavbarModels from "./components/NavbarModels"

export const metadata = {
  title: 'SS Horizons - Admin',
  description: 'Simulation of a web flight reservation system. Purchase of tickets flights and enjoy your trip',
}

export default async function Layout({ children }) {
    
  return (
    <div className="w-full h-full flex justify-between relative bg-[#092635]">
        <NavbarModels models={Object.keys(TRANSLATE_MODELS)}/>
        {children}
    </div>
  )
}
