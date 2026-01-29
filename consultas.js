// consultas.js
// Realiza varias consultas a la base de datos de productos y muestra los resultados.
import mongoose from "mongoose";
import connectDB from "./model/db.js";
import Producto from "./model/Producto.js";

await connectDB();

// Productos de menos de 1€
const baratos = await Producto.find({ precio_euros: { $lt: 1 } });
console.log("\n Productos < 1€");
console.log(baratos);

// Productos < 1 € que no sean agua
const baratosSinAgua = await Producto.find({
  precio_euros: { $lt: 1 },
  categoria: { $not: /Agua/i },
  texto_1: { $not: /agua/i }
});
console.log("\n Productos < 1€ que NO son agua");
console.log(baratosSinAgua);

// Aceites ordenados por precio
const aceites = await Producto.find({ categoria: /aceite/i }).sort({ precio_euros: 1 });
console.log("\n Aceites ordenados por precio");
console.log(aceites);

// Productos en garrafa
const garrafas = await Producto.find({
  $or: [
    { texto_1: /garrafa/i },
    { texto_2: /garrafa/i }
  ]
});
console.log("\n Productos en garrafa");
console.log(garrafas);

mongoose.connection.close();
