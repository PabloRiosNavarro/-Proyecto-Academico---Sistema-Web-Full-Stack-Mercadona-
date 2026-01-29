// public/js/cambio-precio.js

// Función para cambiar el precio de un producto
async function cambiar_precio(evt) {
  const boton = evt.target;
  const id = boton.dataset.id; // ID del producto
  const card = boton.closest(".card");
  const input = card.querySelector(".precio-input");

  if (!input) {
    console.error("No se encontró el input de precio para este producto");
    return;
  }

  const nuevoPrecio = parseFloat(input.value);
  console.log("ID:", id, "Nuevo precio:", nuevoPrecio);

  try {
    const res = await fetch(`/api/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ precio_euros: nuevoPrecio }),
    });

    const data = await res.json();
    console.log("Respuesta API:", data);

    if (res.ok) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      // Buscar el párrafo del precio que tenga el mismo ID
      const precioElemento = document.querySelector(
        `.precio-actual[data-id='${id}']`
      );
      if (precioElemento) {
        if (data.precio_rebajado > 0) {
          precioElemento.innerHTML = `Rebajado: ${data.precio_rebajado.toFixed(
            2
          )} € <span class="text-gray-500 line-through font-normal">${
            data.texto_precio
          }</span>`;
        } else {
          precioElemento.textContent = `${data.precio_euros.toFixed(2)} € /ud.`;
        }
      }

      setTimeout(() => input.classList.remove("is-valid"), 1200);
    } else {
      input.classList.add("is-invalid");
    }
  } catch (err) {
    console.error("ERROR:", err);
    input.classList.add("is-invalid");
  }
}

// Asignar evento a todos los botones de cambiar precio
document
  .querySelectorAll(".btn-cambiar-precio")
  .forEach((boton) => boton.addEventListener("click", cambiar_precio));
