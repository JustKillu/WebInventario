const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); 

const router = express.Router();

router.post('/register',
  body('username').isLength({ min: 1 }),
  body('password').isLength({ min: 1 }),
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('phone').notEmpty(),
  body('country').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password, firstName, lastName,phone,country, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    const user = new User({ username, password, firstName, lastName,phone,country, email });
    await user.save();
    res.status(201).json({ success: 'Registro exitoso!' });
  }
);
router.post('/user/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const productIndex = user.favorites.indexOf(req.body.productId);
    if (productIndex > -1) {
      // Si el producto ya es un favorito, lo elimina de los favoritos
      user.favorites.splice(productIndex, 1);
    } else {
      // Si el producto no es un favorito, lo agrega a los favoritos
      user.favorites.push(req.body.productId);
    }

    await user.save();
    res.json(user.favorites);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error del servidor', error: error });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'usuario invalido o contraseña erronea' });
  }

  const token = jwt.sign({ id: user.id, rol: user.rol }, 'your_jwt_secret'); // Aquí se agrega el rol al token
  res.json({ token });
});

router.get('/user/:id/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error del servidor', error: error });
  }
});

router.get('/user', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, 'your_jwt_secret', async (err, user) => {
    if (err) return res.sendStatus(403); 

    const userDetails = await User.findById(user.id); 
    if (!userDetails) return res.sendStatus(404); 

   
    res.json({ id: userDetails._id, username: userDetails.username,
      password: userDetails.password,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      phone: userDetails.phone,
      country: userDetails.country,
      email: userDetails.email, rol: userDetails.rol }); 
  });
});

router.get('/allusers', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, 'your_jwt_secret', async (err, user) => {
    if (err) return res.sendStatus(403); 

    const userDetails = await User.findById(user.id); 
    if (!userDetails) return res.sendStatus(404); 
    if (userDetails.rol !== 'adm') return res.status(403).json({ error: 'Acceso denegado' });
    const users = await User.find({});
    res.json(users);
  });
});
// Actualizar usuario
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  let { username, firstName, lastName,phone,country, email, rol, password } = req.body;
  if (password && password.trim() !== '') {
    password = await bcrypt.hash(password, 10);
  } else {
    password = undefined;
  }
  const user = await User.findByIdAndUpdate(id, { username, firstName, lastName,phone,country, email, rol, password }, { new: true });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});


// Borrar usuario
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ message: 'Usuario borrado con éxito' });
});

router.put('/user/:id/password', async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!passwordMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: 'Contraseña actualizada con éxito' });
});
router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  let { username, firstName, lastName, phone, country, email, rol, password } = req.body;
  if (password && password.trim() !== '') {
    password = await bcrypt.hash(password, 10);
  } else {
    password = undefined;
  }
  const user = await User.findByIdAndUpdate(id, { username, firstName, lastName, phone, country, email, rol, password }, { new: true });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});




module.exports = router;
