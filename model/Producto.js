// ./model/Producto.js 
import mongoose from 'mongoose';


const productoSchema = new mongoose.Schema({

  categoria: { type: String, required: true, trim: true },

  subcategoria: { type: String, trim: true },

  url_img: { type: String, required: true, trim: true },

  texto_1: { type: String, required: true, trim: true },

  texto_2: { type: String, trim: true },

  texto_precio: { type: String, trim: true },
  
  precio_euros: { type: Number, required: true },

  precio_rebajado: { type: Number, default: 0 }
});

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;