import { FlightProvider } from "./FlightContext"

export const metadata = {
  title: 'SS Horizons - Flights',
  description: 'Simulation of a web flight reservation system. Purchase of tickets flights and enjoy your trip',
}

export default function Layout({ children }) {
  return (
    <FlightProvider>
      {children}
    </FlightProvider>
  )
}
