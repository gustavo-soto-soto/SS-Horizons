import Providers from './Providers'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata = {
  title: 'SS Horizons',
  description: 'Simulation of a web flight reservation system. Purchase of tickets flights and enjoy your trip',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
