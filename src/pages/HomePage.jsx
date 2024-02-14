import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import EditProductForm from '../components/EditProductForm.jsx';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowConfirmModal(true);
  };
  const rol = localStorage.getItem('rol');
  const handleConfirmDelete = () => {
    deleteProduct(productToDelete._id);
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    const updatedProducts = products.filter(product => product._id !== productToDelete._id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  const handleCreate = (product) => {
    fetch('http://localhost:3001/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(data => {
        setProducts([...products, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  const deleteProduct = (id) => {
    fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedProducts = products.filter(product => product._id !== id);
          setProducts(updatedProducts);
        }
        return response.json();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };


  const handleUpdate = (product) => {
    fetch(`http://localhost:3001/products/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(data => {
        setProducts(products.map(p => p._id === data._id ? data : p));
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handleCancel = () => {
    setSelectedProduct(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <SearchBar products={products} setFilteredProducts={setFilteredProducts} />
      <ProductForm onSubmit={handleCreate} />

      {/* Estado que contiene la información del producto que se está mostrando en detalle. Si es null, no se muestra nada. */}
      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-500 ease-in-out" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

          <div className="p-4 rounded shadow-lg max-w-4xl bg-white text-black flex flex-col md:flex-row h-4/6 w-full overflow-auto">

            <div className="w-full md:w-1/2 pr-2">
              <h1 className="text-3xl font-bold mb-2 text-blue-600">Información del Producto</h1>
              <h2 className="text-xl font-semibold mb-2 text-blue-500">{"Producto: " + showDetails.name}</h2>
              <div className="bg-gray-200 p-2 rounded mb-2">
                <p className="text-sm">{showDetails.description}</p>
              </div>
              <p className="mb-2 text-sm">Categoría: {showDetails.category}</p>
              <div className="bg-blue-100 p-2 rounded mt-80 mb-4">
                <p className="text-sm mb-1 text-green-800" >Precio: {showDetails.price}</p>
                <p className="text-sm  text-red-800">Cantidad: {showDetails.quantity}</p>
              </div>
              <button onClick={() => setShowDetails(null)} className="absolute top-5 right-2 bg-red-500 text-white rounded py-1 px-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Cerrar detalles</button>
            </div>

            <div className="w-full md:w-1/2 pl-2 flex flex-col justify-between">
              <div className="h-full w-full overflow-auto">
                <img src={showDetails.image} alt={showDetails.name} className="object-contain h-full w-full rounded" />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Estado que contiene la información del producto que se está editando. Si es null, no se muestra nada. */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full overflow-auto max-h-screen">
            <EditProductForm product={selectedProduct} onSubmit={handleUpdate} onCancel={handleCancel} />
          </div>
        </div>

      )}
  {/* Estado que contiene la lista de productos y filtro.  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-screen-xl mx-auto p-4">
        {filteredProducts.map(product => (
          <div key={product._id} className="flex flex-col items-start border p-4 mb-4 rounded shadow-lg h-auto w-full overflow-hidden bg-white text-left">
            <div className="h-48 w-full overflow-auto relative group cursor-pointer" onClick={() => setShowDetails(product)}>
              <img src={product.image} alt={product.name} className="object-cover h-full w-full transition-opacity group-hover:opacity-80" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity">
                <span className="text-white text-lg group-hover:block hidden">Ver detalles</span>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-blue-500 truncate hover:text-blue-800 cursor-pointer transition-colors duration-200" onClick={() => setShowDetails(product)}>{product.name}</h2>
              <p className="text-lg text-green-500 truncate">Precio: {product.price}</p>
              <p className="text-sm text-red-500 truncate">Cantidad disponible: {product.quantity}</p>
              <p className="text-sm text-purple-500 truncate">Categoría: {product.category}</p>
            </div>

            {rol === 'adm' && (
  <div className="mt-4">
    <button onClick={() => setSelectedProduct(product)} className="px-2 py-1 bg-blue-500 text-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Editar</button>
    <button onClick={() => handleDeleteClick(product)} className="px-2 py-1 ml-2 bg-red-500 text-white rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">Eliminar</button>
  </div>
)}

          </div>
        ))}
          {/* Estado que contiene la confirmacion  */}
        {showConfirmModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        ¿Estás seguro de que quieres eliminar {productToDelete.name}?
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={handleConfirmDelete} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Eliminar
                  </button>
                  <button onClick={() => setShowConfirmModal(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
          {/* Estado que contiene la confirmacion luego de darle eliminar */}
        {showSuccessModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        El producto {productToDelete.name} ha sido eliminado con éxito.
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={() => setShowSuccessModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>



    </div>
  );



}

export default HomePage;
