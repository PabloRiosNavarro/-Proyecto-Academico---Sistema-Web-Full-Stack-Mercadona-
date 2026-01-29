// Parser para extraer informacion de productos de archivos HTML de Mercadona
import fs from 'node:fs'
import { parse } from 'node-html-parser'

// Para acumular la info de los productos
const Info = []

// Lista de archivos copiados de mercadona
const archivos = [
  'aceites.html',
  'agua.html',
  'cereales.html'
]

// Procesar cada archivo
for (const archivo of archivos) {
  const html = Lee_archivo(archivo)
  const root = parse(html)

  const categoria = root.querySelector('h1').text

  //recorrer por subcategorias donde cada subcategoria suele estar en un <h2> o dentro de un bloque
  const bloques_subcategorias = root.querySelectorAll('section.section')


  if (bloques_subcategorias.length > 0) {
    for (const bloque of bloques_subcategorias) {
      const subcategoria = Arregla_texto(bloque.querySelector('h2').innerText)

      const lista_productos = bloque.querySelectorAll('div.product-cell')
      for (const producto of lista_productos) {
        procesa_producto(producto, categoria, subcategoria)
      }
    }
  } else {
    // y si no hay subcategorias recorro la categoria
    const lista_productos = root.querySelectorAll('div.product-cell')
    for (const producto of lista_productos) {
      procesa_producto(producto, categoria, null)
    }
  }
}

// guardo todos los resultados en JSON
const string_para_guardar_en_formato_json = JSON.stringify(Info, null, 2)
try {
  fs.writeFileSync('datos_mercadona.json', string_para_guardar_en_formato_json)
  console.log('Guardado archivo datos_mercadona.json')
} catch (error) {
  console.error('Error guardando archivo: ', error)
}


// FUNCIONES PARA AYUDAR A PROCESAR PRODUCTOS, LEER ARCHIVOS Y ARREGLAR TEXTOS

//Funcion para procesar producto donde guardamos en la variable info_prod sus caracteristicas 
function procesa_producto(producto, categoria, subcategoria) {
  const img = producto.querySelector('img')
  const url_img = img?.attrs.src
  const texto_1 = img?.attrs.alt

  const t2 = producto.querySelector('div.product-format')
  const texto_2 = Arregla_texto(t2?.text || '')

  const texto_precio = Arregla_texto(producto.querySelector('div.product-price')?.innerText || '')
  const r1 = texto_precio.match(/(\d+),?(\d+)?(.+)/)
  //EN r1 guardamos el texto del precio dividido, seria por ejemplo [12,99$  - 12    -    99  -   $]
  let precio_euros
  if (r1 && r1[1]) {
    precio_euros = r1[2] ? Number(r1[1] + '.' + r1[2]) : Number(r1[1])      //Convierto el texto de r1 a un número 
  }

  const info_prod = {
    categoria,
    subcategoria,
    url_img,
    texto_1,
    texto_2,
    texto_precio,
    precio_euros
  }
  Info.push(info_prod)
}

function Arregla_texto(texto) {
  if (!texto) return ''
  let arreglado = texto.replace('\n', '')
  arreglado = arreglado.replace(/\s+/g, ' ')
  return arreglado.trim()
}

function Lee_archivo(archivo) {
  try {
    return fs.readFileSync(archivo, 'utf8')
  } catch (error) {
    console.error('Error leyendo archivo: ', error)
  }
}
