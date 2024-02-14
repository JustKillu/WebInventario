import React, { useState, useEffect } from 'react';

function SearchBar({ products, setFilteredProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  // Se obtienen todas las categorías únicas de los productos
  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filter.toLowerCase()
      );
    }
    setFilteredProducts(filtered);
  }, [searchTerm, filter, products, setFilteredProducts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-1/2 px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:shadow-outline"
      />
      <select onChange={handleFilter} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded">
        <option value="">Todos</option>
        {categories.map(category => (
          <option value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchBar;
