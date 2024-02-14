import React, { useState, useEffect } from 'react';

function EditProductForm({ product, onSubmit, onCancel }) {
  const [formProduct, setFormProduct] = useState(product);

  useEffect(() => {
    setFormProduct(product);
  }, [product]);

  const handleChange = (e) => {
    setFormProduct({...formProduct, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formProduct);
  }
  return (
    <div className="border p-4 mb-4 rounded shadow-lg bg-gray-200 flex flex-col md:flex-row items-start md:items-center">
      <img src={formProduct.image} alt={formProduct.name} className="w-full h-full md:w-3/5 object-cover mb-4 md:mb-0 md:mr-12" />
      <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-2/5 h-auto max-w-xl mx-auto">
          <label className="block">
            <span className="text-gray-700 font-semibold">Nombre del producto:</span>
            <input type="text" name="name" value={formProduct.name} onChange={handleChange} className="mt-1 block w-full border-2 shadow-md p-2 rounded-md" required />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Descripción del producto:</span>
            <textarea name="description" value={formProduct.description} onChange={handleChange} className="mt-1 block w-full h-20 border-2 shadow-md p-2 rounded-md resize-none" required></textarea>
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Precio del producto:</span>
            <input type="number" name="price" value={formProduct.price} onChange={handleChange} className="mt-1 block w-full border-2 shadow-md p-2 rounded-md" required />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Cantidad inicial:</span>
            <input type="number" name="quantity" value={formProduct.quantity} onChange={handleChange} className="mt-1 block w-full border-2 shadow-md p-2 rounded-md" required />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">URL de la imagen del producto:</span>
            <input type="text" name="image" value={formProduct.image} onChange={handleChange} className="mt-1 block w-full border-2 shadow-md p-2 rounded-md" required />
          </label>
          <label className="block">
            <span className="text-gray-700 font-semibold">Categoría del producto:</span>
            <input type="text" name="category" value={formProduct.category} onChange={handleChange} className="mt-1 block w-full border-2 shadow-md p-2 rounded-md" required />
          </label>
          <div className="flex space-x-4 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Actualizar Producto</button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Cancelar</button>
          </div>
        </form>
      </div>
    )};

export default EditProductForm;
