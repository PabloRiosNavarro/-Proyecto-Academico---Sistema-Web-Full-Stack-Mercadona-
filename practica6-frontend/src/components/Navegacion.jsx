export default function Navegacion({ onInput }) {
  return (
    <header className="header-dai border-b mb-4">
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold m-0">Tienda DAI</h1>
          <span className="text-gray-500 text-sm">Búsqueda anticipada</span>
        </div>

        {/* Buscador */}
        <form className="flex-grow mx-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="search"
            className="buscador-dai w-full border rounded px-3 py-1"
            placeholder="Buscar productos..."
            onInput={onInput}
          />
        </form>

        {/* Acciones */}
        <div className="flex items-center gap-3 text-sm">
          <a href="#" className="no-underline text-gray-800">Categorías</a>
          <a href="/usuarios/login" className="no-underline">Identifícate</a>
          <a className="relative bg-yellow-400 px-3 py-1 rounded flex items-center gap-1 text-sm">
            🛒 <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-full">0</span>
            0 €
          </a>
        </div>
      </div>
    </header>
  )
}