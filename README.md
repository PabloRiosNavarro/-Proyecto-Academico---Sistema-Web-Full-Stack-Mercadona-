# 🛒 Proyecto Académico: TiendaDAI (Mercadona Clone)

Este repositorio contiene el proyecto final de la asignatura **Desarrollo de Aplicaciones en Internet (DAI)**. Se trata de una plataforma de e-commerce full-stack completa (inspirada en Mercadona), que evoluciona desde un servidor básico hasta una arquitectura moderna y contenerizada.

---


## 🚀 Funcionalidades Principales

El sistema ofrece una experiencia completa tanto para clientes como para administradores.
El sistema está dividido en dos interfaces con propósitos distintos:

### 🌐 Web Principal (Renderizado en Servidor - Nunjucks)
Esta es la versión totalmente funcional de la tienda:
* **Catálogo Completo:** Visualización de productos con navegación por categorías.
* **Carrito de Compra:** Gestión de estado mediante `express-session` (añadir ítems al carrito).
* **Sistema de Usuarios:** Registro y Login con sesiones seguras mediante **JWT** en cookies `httpOnly`.
* **Panel de Administración:** Edición de precios "en caliente" y eliminación de productos.

### ⚛️ Micro-Frontend React (Búsqueda Interactiva)
Ubicado en la carpeta `practica6-frontend`, este módulo es una implementación específica para demostrar el uso de una API REST:
* **Búsqueda en Tiempo Real:** Los productos se filtran automáticamente conforme el usuario escribe en la barra de búsqueda.
* **Consumo de API:** Realiza peticiones asíncronas al backend para actualizar la vista sin recargar la página.
* **Nota Importante:** En esta interfaz **solo es funcional la barra de búsqueda**; el resto de botones y enlaces son estáticos.

### ⚙️ Módulos Especiales
* **Data Scraper:** Scripts (`parser.js`) para extraer datos de HTMLs locales y generar un JSON maestro.
* **Seeding:** Script de carga masiva (`seed.js`) para poblar MongoDB automáticamente.

---

## 🛠️ Tecnologías y Stack

### Backend (Server-Side)
* **Runtime:** Node.js (ES Modules) con **Express 5**.
* **Base de Datos:** MongoDB + Mongoose (ODM).
* **Vistas:** Renderizado SSR con **Nunjucks**.
* **Seguridad:** `bcrypt` (hashing) y `jsonwebtoken` (auth).
* **Logging:** Winston (consola y archivos).

### Frontend (Client-Side)
* **Framework:** React (en carpeta `practica6-frontend`).
* **Estilos:** Tailwind CSS / Bootstrap.
* **Build Tool:** Vite (configurado con proxy para la API).

### Infraestructura
* **Contenedores:** Docker & Docker Compose.
* **Proxy Inverso:** Caddy (para gestión de tráfico y archivos estáticos).

---

## 📈 Evolución del Proyecto (P1 - P7)

El desarrollo se realizó de forma incremental a través de 7 fases:
* **P1 & P2:** Servidor básico y sistema de rutas con Express.
* **P3:** Integración de Nunjucks y diseño responsive.
* **P4:** Modelado de datos con Mongoose y persistencia en MongoDB.
* **P5:** Implementación del carrito de compra con sesiones.
* **P6:** Seguridad, roles de usuario y desarrollo de API REST para el cliente React.
* **P7:** Configuración del proxy y contenerización con Docker y orquestación de servicios.

---

## 🐳 Instalación y Ejecución Rápida (Docker)

La forma más sencilla de levantar el proyecto (BD + Backend + Frontend) es usando Docker:

1.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz basado en lo siguiente:
    ```env
    PORT=8000
    MONGO_URI=mongodb://root:example@mongodb:27017/DAI?authSource=admin
    SECRET_KEY=tu_clave_secreta
    ```

2.  **Levantar el entorno:**
    ```bash
    docker-compose up --build
    ```

3.  **Acceso:**
    * **Tienda (SSR/Backend):** `http://localhost:8000`
    * **Frontend React:** `http://localhost:5173`

---

## ⚙️ Ejecución Manual (Desarrollo)

Si prefieres ejecutarlo sin Docker, asegúrate de tener Node.js (v16+) y MongoDB corriendo localmente:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Poblar la base de datos:**
    ```bash
    node seed.js
    ```

3.  **Iniciar el servidor:**
    ```bash
    npm run dev
    ```
