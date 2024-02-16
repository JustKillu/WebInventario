import React, { useState, useEffect } from 'react';

function SearchBar({ products, setFilteredProducts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favoritesMessage, setFavoritesMessage] = useState(''); // Nuevo estado para el mensaje de favoritos
  const [isButtonActive, setIsButtonActive] = useState(false);
  const categories = [...new Set(products.map(product => product.category))];

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('id');
  
        while (!token || !userId) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          token = localStorage.getItem('token');
          userId = localStorage.getItem('id');
        }
  
        const response = await fetch(`http://localhost:3001/user/${userId}/favorites`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setFavorites(data.favorites);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    loadFavorites();
  }, []);

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
    if (showFavorites) {
      if (favorites.length === 0) {
        setFavoritesMessage('No se han encontrado favoritos'); // Actualizar el mensaje de favoritos
        setFilteredProducts([]);
      } else {
        filtered = filtered.filter(product => favorites.includes(product._id));
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(filtered);
    }
  }, [searchTerm, filter, showFavorites, products, favorites, setFilteredProducts]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleShowFavorites = async () => {
    setIsButtonActive(prevState => !prevState);
    setShowFavorites(prevState => !prevState);
    if (!showFavorites) {
      try {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('id');
    
        while (!token || !userId) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          token = localStorage.getItem('token');
          userId = localStorage.getItem('id');
        }
    
        const response = await fetch(`http://localhost:3001/user/${userId}/favorites`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        if (data.favorites.length === 0) {
          setFavoritesMessage('No se han encontrado favoritos');
          return;
        }
        setFavorites(data.favorites);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setFavoritesMessage('');
    }
  }
  


return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-1/2 px-3 py-2 placeholder-gray-500 text-white-900 rounded-md focus:outline-none focus:shadow-outline"
      />
      <select onChange={handleFilter} className="ml-2 px-3 py-2 bg-blue-500 text-white rounded">
        <option value="">Todos</option>
        {categories.map(category => (
          <option value={category}>{category}</option>
        ))}
      </select>
      <button onClick={handleShowFavorites} className={`ml-2 ${isButtonActive ? 'bg-blue-500 text-white' : 'bg-white text-black'} px-3 py-2 rounded-md`}>
        Mostrar solo favoritos
      </button>
      {showFavorites && favoritesMessage && <p>{favoritesMessage}</p>} {/* Mostrar el mensaje de favoritos cuando sea apropiado */}
    </div>
  );
  
}

export default SearchBar;
