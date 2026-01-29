// seed.js
// Script para cargar datos de productos desde un archivo JSON a la base de datos MongoDB
import fs from "fs";
import mongoose from "mongoose";
import connectDB from "./model/db.js";
import Producto from "./model/Producto.js";

await connectDB();

const datos_productos = fs.readFileSync("datos_mercadona.json", "utf8");
const lista_productos = JSON.parse(datos_productos);

await Guardar_en_modelo(Producto, lista_productos);

mongoose.connection.close();

// https://mongoosejs.com/docs/api/model.html#Model.insertMany()
// devuelve una 'Promise', por tanto asíncrono

async function Guardar_en_modelo(modelo, lista) {
  try {
    console.log(`Intentando insertar ${lista.length} productos`);
    const insertados = await modelo.insertMany(lista);
    console.log(`Insertados ${insertados.length} documentos`);
  } catch (error) {
    console.error(`Error guardando lista: ${error.message}`);
  }
}
