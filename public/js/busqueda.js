// public/js/busqueda.js

/**
 * Funcion que toma un objeto de producto, lo inserta en la plantilla 
 * y lo añade al contenedor de tarjetas.
 * @param {Object} p - El objeto producto p devuelto por el servidor.
 */
function muestraProducto(p) {  
    // 1. Obtener la plantilla
    const template = document.getElementById('plantilla');
    
    // Si no hay plantilla, salir.
    if (!template) {
        console.error("No se encontró la plantilla con ID 'plantilla'");
        return;
    }

    // 2. Clonamos la plantilla 
    const clonado = template.content.cloneNode(true);
    
    const tarjeta = clonado.querySelector('.card'); 
    
    //Sustituimos la información del producto

    const img = tarjeta.querySelector('img');
    img.src = p.url_img; 
    img.alt = p.texto_1;
    
    // Nombre y Descripción
    tarjeta.querySelector('#nombre-producto').textContent = p.texto_1;
    tarjeta.querySelector('#descripcion-producto').textContent = p.texto_2;
    
    // Precio 
    const precioElement = tarjeta.querySelector('#precio-producto');
    precioElement.textContent = p.texto_precio;
    precioElement.dataset.id = p._id; // Importante para la funcionalidad de cambiar precio

    // Enlace para aniadir al Carrito
    const enlaceCarrito = tarjeta.querySelector('a.bg-blue-600');
    enlaceCarrito.href = `/al_carrito/${p._id}`;


    // Agregamos el clonado al contenedor de tarjetas
    const tarjetasContenedor = document.getElementById('tarjetas');
    tarjetasContenedor.append(clonado);
}


/**
 * Función principal para manejar la busqueda anticipada
 */
async function buscarProductos() {
    const query = this.value.trim(); // 'this' se refiere al input
    const tarjetasContenedor = document.getElementById('tarjetas');
    
    // Si la búsqueda está vacía, no hacemos nada o restauramos la vista inicial (opcional)
    if (query.length === 0) {
        // Opción: Limpiar resultados de búsqueda si no hay query
        tarjetasContenedor.innerHTML = '';
        return;
    }

    try {
        // 1. Peticion al endpoint de busqueda
        const res = await fetch(`/api/productos?texto_1=${encodeURIComponent(query)}`);
        
        if (!res.ok) {
            throw new Error(`Error en la petición: ${res.statusText}`);
        }
        
        const productos = await res.json();
        
        // 2. Limpiar el contenedor actual antes de insertar los nuevos resultados
        tarjetasContenedor.innerHTML = ''; 
        
        // 3. Insertar cada nuevo producto
        productos.forEach(p => muestraProducto(p));

    } catch (error) {
        console.error("Error al realizar la búsqueda:", error);
    }
}

// Inicializamos
document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.querySelector('.buscador-dai');
    if (buscador) {
        // Escucha el evento 'input' para cada vez que escribimos en el buscador
        buscador.addEventListener('input', buscarProductos);
    }
});