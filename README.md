# 🛒 Proyecto Académico — Sistema Web Full-Stack (Mercadona Clone)

Este repositorio contiene un proyecto académico para la asignatura de Desarrollo de Aplicaciones en Internet (DAI). Simula una tienda online (inspirada en Mercadona) integrando un backend robusto en Node.js con una base de datos MongoDB y un frontend moderno opcional en React.

---

## 🛠️ Herramientas y Tecnologías

El proyecto utiliza un stack moderno y escalable:

### Backend (Server-Side)
* **Runtime:** Node.js (ES Modules).
* **Framework:** Express 5.
* **Base de Datos:** MongoDB + Mongoose (ODM).
* **Renderizado (SSR):** Nunjucks para vistas públicas.
* **Seguridad:**
    * `jsonwebtoken` (JWT) para autenticación vía cookies `httpOnly`.
    * `bcrypt` para hashing de contraseñas.
* **Logging:** Winston (logs en consola y archivo).
* **Parsing:** `node-html-parser` para extracción de datos de HTMLs locales.

### Frontend (Client-Side)
* **Framework:** React (en carpeta `practica6-frontend`).
* **Build Tool:** Vite.
* **Estilos:** Tailwind CSS.
* **Proxy:** Configurado en Vite para redirigir peticiones API al backend.

### Infraestructura
* **Contenedores:** Docker y Docker Compose.

---

## ✨ Funcionalidades Principales

El sistema está dividido en varios módulos lógicos:

1.  **API RESTful (`/api/products`):**
    * CRUD completo de productos.
    * Búsqueda avanzada por texto, categoría y subcategoría.
2.  **Sistema de Usuarios (`Auth`):**
    * Registro y Login seguros.
    * Gestión de sesiones mediante **JWT** almacenado en cookies seguras.
3.  **Carrito de Compra:**
    * Gestión de estado del carrito mediante `express-session`.
4.  **Data Scraper & Seeding:**
    * Scripts (`parser.js`) que leen HTMLs locales (simulando la web real) para generar un JSON maestro.
    * Script de carga masiva (`seed.js`) para poblar la base de datos.
5.  **Vistas Híbridas:**
    * Interfaz renderizada en servidor con Nunjucks (Portada, Login, Carrito).
    * Cliente React independiente para consumo de API.

---

## 🐳 Despliegue Rápido con Contenedores (Docker)

Si dispones de Docker y Docker Compose, puedes levantar toda la arquitectura (Base de datos + Backend + Frontend) con un solo comando.

1.  **Crear archivo `.env`:**
    Asegúrate de tener el archivo `.env` en la raíz (básate en el ejemplo de abajo).

2.  **Levantar servicios:**
    ```bash
    docker-compose up --build
    ```

3.  **Acceso:**
    * **Backend/Tienda:** `http://localhost:8000`
    * **Frontend React:** `http://localhost:5173`
    * **MongoDB:** Puerto `27017` (interno).

---

## ⚙️ Instalación y Ejecución Manual (Sin Docker)

Si prefieres ejecutar el entorno localmente paso a paso:

### 1. Requisitos Previos
* Node.js (v16+).
* MongoDB corriendo localmente o URI remota.

### 2. Configuración de Entorno (.env)
Crea un archivo `.env` en la raíz del proyecto:
```env
PORT=8000
MONGO_URI=mongodb://root:example@localhost:27017/DAI?authSource=admin
SECRET_KEY=tu_clave_secreta_super_segura
