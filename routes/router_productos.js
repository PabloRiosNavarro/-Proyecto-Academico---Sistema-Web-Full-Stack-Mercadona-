import express from "express";
import Producto from "../model/Producto.js";
import logger from "../logger.js";

const router = express.Router();

// GET /api/productos
// GET /api/productos con búsqueda opcional
router.get("/", async (req, res) => {
  try {
    const { texto_1, nombre, categoria } = req.query;

    // Construir filtros según parámetros
    const filtros = {};
    if (texto_1) filtros.texto_1 = { $regex: texto_1, $options: "i" };
    if (nombre) filtros.texto_1 = { $regex: nombre, $options: "i" };
    if (categoria) filtros.categoria = { $regex: categoria, $options: "i" };

    const productos = await Producto.find(filtros);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET /api/productos/:id
router.get("/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
});

// POST /api/productos
router.post("/", async (req, res) => {
  try {
    const nuevo = new Producto(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear producto" });
  }
});

// DELETE /api/productos/:id
router.delete("/:id", async (req, res) => {
  try {
    const borrado = await Producto.findByIdAndDelete(req.params.id);

    if (!borrado)
      return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { precio_euros } = req.body;

    if (typeof precio_euros !== "number") {
      return res.status(400).json({ error: "precio_euros debe ser un número" });
    }

    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      {
        precio_euros,
        texto_precio: `${precio_euros.toFixed(2)} € /ud.`, // actualizamos texto_precio
      },
      { new: true }
    );

    if (!actualizado) {
      logger.warn(`Producto no encontrado: ${req.params.id}`);
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    logger.info(
      `Precio del producto ${actualizado.texto_1} actualizado a ${actualizado.precio_euros}€`
    );
    res.json(actualizado);
  } catch (error) {
    logger.error(`Error al actualizar producto: ${error.message}`);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
});

router.get("/busqueda-anticipada/:texto", async (req, res) => {
  const texto = req.params.texto.toLowerCase();

  const productos = await Producto.findAll();

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(texto)
  );

  res.json(filtrados);
});

export default router;
