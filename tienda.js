// tienda.js 
import express   from "express"
import session from "express-session"
import nunjucks  from "nunjucks"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import cors from 'cors';

import connectDB from "./model/db.js"
import TiendaRouter from "./routes/router_tienda.js";
import UsuariosRouter from './routes/router_usuarios.js';
import routerProductos from "./routes/router_productos.js";
import logger from './logger.js';

await connectDB()
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(cors());

const autentificacion = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.username = data.usuario;
      req.isAdmin = data.admin;
      app.locals.usuario = data.usuario;
      app.locals.isAdmin = data.admin;

      logger.info(`Auth: Usuario [${data.usuario}] autenticado`); 

    } catch (err) {
      res.clearCookie('access_token');
      app.locals.usuario = undefined;
      app.locals.isAdmin = false;
      logger.warn('Auth: Token inválido o expirado');
    }
  } else {
    app.locals.usuario = undefined;
    app.locals.isAdmin = false;
    logger.info('No hay token en este momento');  
  }

  next();
};


app.use(autentificacion); 

app.use(session({
	secret: 'my-secret',      // a secret string used to sign the session ID cookie
	resave: false,            // don't save session if unmodified
	saveUninitialized: false  // don't create session until something stored
}))

app.use("/", TiendaRouter);
app.use('/usuarios', UsuariosRouter);

app.use("/api/productos", routerProductos);



const IN = process.env.IN || 'development'

nunjucks.configure('views', {         // directorio 'views' para las plantillas html
	autoescape: true,
	noCache:    IN === 'development',   // true para desarrollo, sin cache
	watch:      IN === 'development',   // reinicio con Ctrl-S
	express: app
})
app.set('view engine', 'html')

app.use('/static', express.static('public'))     // directorio public para archivos css, js, imágenes, etc.


// test para el servidor
app.get("/hola", (req, res) => {
  res.send('Hola desde el servidor');
});

// test para las plantillas
app.get("/test", (req, res) => {
  res.render('test.html');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Servidor ejecutandose en  http://localhost:${PORT}`);
})

app.use((err, req, res, next) => {
  logger.error(`Error inesperado: ${err.message}`);
  res.status(500).send('Error interno del servidor');
});

process.on('uncaughtException', (err) => {
  logger.error(`Excepción no capturada: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`Rechazo de promesa no manejado: ${reason}`);
});