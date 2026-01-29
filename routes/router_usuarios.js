import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/Usuario.js';

const router = express.Router();

// Mostrar formulario de registro
router.get('/registro', (req, res) => {
  res.render('usuarios/registro.html');
});

// Procesar registro (POST)
router.post('/registro', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render('usuarios/registro.html', { error: 'El email ya está registrado' });
    }

    // Crear nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    // Crear token JWT
    const SECRET_KEY = process.env.SECRET_KEY;
    const user_db = await User.findOne({ email });
    const token = jwt.sign({usuario:user_db.name, admin:user_db.admin}, SECRET_KEY, { expiresIn: '7d' });

    // Guardar token en cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.IN === 'production',
      sameSite: 'lax'
    }).redirect('/');
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).render('usuarios/registro.html', { error: 'Error interno del servidor' });
  }
});

// Mostrar formulario de login
router.get('/login', (req, res) => {
  res.render('usuarios/login.html');
});

// Procesar login (POST)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('usuarios/login.html', { error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).render('usuarios/login.html', { error: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const SECRET_KEY = process.env.SECRET_KEY;
    const user_db = await User.findOne({ email });;
    const token = jwt.sign({usuario:user_db.name, admin:Boolean(user_db.admin)},SECRET_KEY, { expiresIn: '7d' });

    // Guardar token en cookie
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.IN === 'production',
      sameSite: 'lax'
    }).redirect('/');
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).render('usuarios/login.html', { error: 'Error interno del servidor' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  // Borrar cookie JWT
  res.clearCookie('access_token');

  // Destruir sesión de Express
  req.session.destroy(err => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
    }
    // Redirigir a la página principal
    res.redirect('/');
  });
});


export default router;
