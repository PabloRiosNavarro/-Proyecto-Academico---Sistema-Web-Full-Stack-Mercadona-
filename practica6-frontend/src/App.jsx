import { useState } from "react"
import Navegacion from "./components/Navegacion"
import Resultados from "./components/Resultados"

function App() {
  const [busqueda, setBusqueda] = useState('')

  const handleInput = (evt) => {
    setBusqueda(evt.target.value)
  }

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      <Navegacion onInput={handleInput} />
      
      <main>
        <h2 className="text-xl font-semibold mb-4">
          {busqueda ? "Resultados de búsqueda" : "Productos destacados"}
        </h2>
        <Resultados de={busqueda} />
      </main>

      <footer className="mt-4 text-gray-500 text-center">
        <hr className="mb-2" />
        <p>© 2025 Tienda Online</p>
      </footer>
    </div>
  )
}

export default App
