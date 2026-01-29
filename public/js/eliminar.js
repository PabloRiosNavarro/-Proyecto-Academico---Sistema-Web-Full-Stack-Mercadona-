// public/js/eliminar.js

// Funcion para eliminar un producto
async function eliminar_producto(evt) {
  const boton = evt.target;
  const id = boton.dataset.id; // ID del producto
  const card = boton.closest(".card");

  //Si no existe el ID se devuelve error
  if (!id) {
    console.error("No se encontró el id del producto");
    return;
  }

  try {
    //Hago la llamada a la API para que elimine el producto con la ruta de router_productos para eliminarlos
    const res = await fetch(`/api/productos/${id}`, {
      method: "DELETE",
      headers: { "Accept": "application/json" },
    });

    let data = null;
    try {
      const contentType = res.headers.get("content-type");
      if (contentType.includes("application/json")) data = await res.json();
    } catch (e) {
    }

    if (res.ok) {
        //Elimino la tarjeta del producto para que no siga apareciendo
      if (card && card.remove) {
        card.remove();
      }
      console.log("Producto eliminado:", id, data);
    } else {
      console.error("Error al eliminar producto:", res.status, data);
      alert((data && data.error));
    }
  } catch (err) {
    console.error("ERROR al eliminar el producto:", err);
    alert("Error al eliminar el producto. Revisa la consola para más detalles.");
  }
}

// Asignar evento a todos los botones de eliminar producto
document
  .querySelectorAll(".btn-eliminar-producto")
  .forEach((boton) => boton.addEventListener("click", eliminar_producto));
