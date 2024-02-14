import React, { useState, useRef, useEffect } from 'react';

function ProductForm({ product, onSubmit }) {
  const [formProduct, setFormProduct] = useState(product || {name: '', description: '', price: '', quantity: '', image: '', category: ''});
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setFormProduct({...formProduct, [e.target.name]: e.target.value});
  }
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formProduct);
    setAlert(true);
    setShowForm(false);
    setTimeout(() => setAlert(false), 1500); 
  }
  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };
  

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    {alert && (
          <div className="fixed top-0 right-0 z-50 m-6 bg-green-500 text-white py-2 px-4 rounded">
            Producto creado con éxito
          </div>
        )}
    {showForm ? (
      <div className="fixed z-10 inset-0 overflow-y-auto bg-transparent" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" ref={formRef}>
            <form onSubmit={handleSubmit} className="p-6">
              <input type="text" name="name" value={formProduct.name} onChange={handleChange} placeholder="Nombre del producto" required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
              <textarea name="description" value={formProduct.description} onChange={handleChange} placeholder="Descripción del producto" required className="resize-none w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300"></textarea>
              <input type="number" name="price" value={formProduct.price} onChange={handleChange} placeholder="Precio del producto" required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
              <input type="number" name="quantity" value={formProduct.quantity} onChange={handleChange} placeholder="Cantidad inicial" required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
              <input type="text" name="image" value={formProduct.image} onChange={handleChange} placeholder="URL de la imagen del producto" required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
              {formProduct.image && <img src={formProduct.image} alt="Previsualización de la imagen del producto" className="w-full object-cover h-48 mb-6" />}
              <input type="text" name="category" value={formProduct.category} onChange={handleChange} placeholder="Categoría del producto" required className="w-full p-2 mb-6 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" />
              <button type="submit" className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none">
                {product ? 'Actualizar' : 'Crear'} Producto
              </button>
            </form>
          </div>
        </div>
        
      </div>
    ) : (
      <button className="fixed right-0 bottom-0 m-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full z-50" onClick={() => setShowForm(true)}>
        Añadir Producto
      </button>
    )}
    </>
  );
    }
export default ProductForm;
