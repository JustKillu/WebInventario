const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema del producto
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  image: String,
  category: String
});

// Crear el modelo del producto
const Product = mongoose.model('Producto', productSchema, 'Productos');

// Crear una instancia de express
const app = express();

// Analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta de la API para obtener productos
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Ruta de la API para crear un producto
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});

// Ruta de la API para actualizar un producto
router.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error: error });
  }
});
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Producto eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error', error: error });
  }
});

module.exports = router;
