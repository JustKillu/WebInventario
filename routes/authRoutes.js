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
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password, firstName, lastName, email } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    const user = new User({ username, password, firstName, lastName, email }); // Aquí se crea el nuevo usuario sin especificar el rol
    await user.save();
    res.status(201).json({ success: 'Registro exitoso!' });
  }
);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, rol: user.rol }, 'your_jwt_secret'); // Aquí se agrega el rol al token
  res.json({ token });
});

router.get('/user', async (req, res) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); 

  jwt.verify(token, 'your_jwt_secret', async (err, user) => {
    if (err) return res.sendStatus(403); 

    const userDetails = await User.findById(user.id); 
    if (!userDetails) return res.sendStatus(404); 

    res.json({ username: userDetails.username, rol: userDetails.rol }); 
  });
});


module.exports = router;
