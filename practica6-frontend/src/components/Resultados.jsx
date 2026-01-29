import useSWR from 'swr';

const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error al obtener los datos de la API.");
    }
    return res.json();
};

// Componente Tarjeta para renderizar cada producto
function Tarjeta({ p }) {
    // Reutiliza la estructura de la tarjeta con Tailwind, pero usando className
    return (
        <div className="card bg-white rounded shadow-sm overflow-hidden">
            <img src={p.url_img} alt={p.texto_1} className="w-full h-48 object-contain" />
            <div className="p-4">
                <h5 className="font-semibold text-base mb-1">{p.texto_1}</h5>
                <p className="text-sm text-gray-600 mb-2">{p.texto_2}</p>
                
                {}
                <p className="precio-actual text-green-600 font-semibold" data-id={p._id}>
                    {p.texto_precio}
                </p>

                <a href={`/al_carrito/${p._id}`}
                   className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition">
                    Añadir al carrito
                </a>
            </div>
        </div>
    );
}


export default function Resultados({de}) {
    // Si la busqueda es muy corta, es decir menos de 2, no hacemos la petición.
    if (de.length < 2) return <div className="p-4 text-center text-gray-500"> Introduce al menos 2 caracteres para buscar </div>

    // Construir la URL de busqueda (usando 'texto_1' como determinamos antes)
    // Usamos ruta (/api/...) Y volvemos a poner texto_1
    const apiUrl = `/api/productos?texto_1=${encodeURIComponent(de)}`;

    const { data: productos, error, isLoading } = useSWR(
        apiUrl,
        fetcher
    );
    
    // Funcion para renderizar el array de productos
    const ponProductos = (data) => {
        if (!data || data.length === 0) {
            return <div className="p-4 text-center text-gray-700"> No se encontraron productos para "{de}". </div>;
        }

        // Mapeamos el array de productos a componentes Tarjeta para renderizarlo en react
        return (
            <div id="tarjetas" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {productos.map(p => (
                    
                    <Tarjeta key={p._id} p={p} /> 
                ))}
            </div>
        );
    }

    return (
        <div>
            {
                isLoading ? (
                    <div className="p-4 text-center"><h1>Cargando resultados...</h1></div>
                ) : error ? (
                    <div className="p-4 text-red-600">Error: {error.message}</div>
                ) : productos ? (
                    ponProductos(productos)
                ) : (
                    <div className="p-4">...</div>
                )
            }
        </div>
    );
}