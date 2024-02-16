const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

// Inicializar la aplicación Express
const app = express();

// Permitir solicitudes CORS desde tu aplicación React
app.use(cors());

// Usar express.json() como middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/Inventario');

// Rutas
app.use(productRoutes);
app.use(authRoutes);



app.listen(3001, () => console.log('Server is running on http://localhost:3001'));
