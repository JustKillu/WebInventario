// HomePage.js
import React, { useEffect, useState } from 'react';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="p-4">
        <h2>hola</h2>
      <h1 className="text-2xl font-bold mb-4">Inventario de la Tienda</h1>
      {products.map(product => (
        <div key={product.id} className="bordear p-4 mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>{product.description}</p>
          <p>Precio: {product.price}</p>
          <p>Cantidad disponible: {product.quantity}</p>
          <img src={product.image} alt={product.name} className="w-64" />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
