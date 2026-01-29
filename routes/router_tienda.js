// ./routes/router_tienda.js
import express from "express";
import Producto from "../model/Producto.js";
const router = express.Router();
 


router.use((req, res, next) => {
  if (!req.session.carrito) req.session.carrito = []
  res.locals.carrito = req.session.carrito

  let total = 0;
  for (let i = 0; i < req.session.carrito.length; i++) {
    total += Number(req.session.carrito[i].precio_euros) || 0;
  }
  res.locals.total_carrito = total;


  next()
})


// Portada en /
router.get("/", async (req, res) => {
  try {
    const busqueda = req.query.q || ""; // si no hay busqueda queda vacio la variable busqueda (Busqueda="")
    let productos;

    if (busqueda) {
      // Buscar en texto_1, texto_2, categoria y subcategoria
      const regex = new RegExp(busqueda, "i"); 
      productos = await Producto.find({
        $or: [
          { texto_1: regex },
          { texto_2: regex },
          { categoria: regex },
          { subcategoria: regex }
        ]
      });
    } else {
      productos = await Producto.find({}).limit(10); // portada
    }

    res.render("portada.html", { productos, busqueda });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});


// Añadir producto al carrito
router.get("/al_carrito/:id", async (req, res) => {
  const id = req.params.id
  const producto = await Producto.findById(id)
  if (producto) req.session.carrito.push(producto)

  // Redirige de nuevo a la pagina donde estaba (recarga)
   const backURL = req.get('referer') || '/'
  res.redirect(backURL)  // vuelve a la misma pagina, manteniendo la busqueda
})


router.get('/busqueda-anticipada', (req, res) => {
    res.render('busqueda_anticipada.html');
});

export default router