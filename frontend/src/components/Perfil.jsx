import { useState, useEffect } from 'react';

export default function Perfil() {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    email: '',
    rol: '',
    password: ''
  });

  const [alert, setAlert] = useState({visible: false, message: '', type: ''});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setUser({ ...data, id: data.id });
      } catch (error) {
        setAlert({visible: true, message: `Error: ${error}`, type: 'error'});
        setTimeout(() => setAlert({visible: false, message: '', type: ''}), 1500);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in user) {
        if (!user[key] || !user[key].trim()) {
          setAlert({visible: true, message: 'Por favor, rellene todos los campos antes de enviar.', type: 'error'});
          setTimeout(() => setAlert({visible: false, message: '', type: ''}), 1500);
          return;
        }
      }
      
    try { 
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/update-user/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(user)
        
      });
      if (!res.ok) throw new Error(res.statusText);
      setAlert({visible: true, message: 'Perfil actualizado con éxito!', type: 'success'});
      setTimeout(() => setAlert({visible: false, message: '', type: ''}), 1500); 
    } catch (error) {
        setAlert({visible: true, message: `Error: ${error}`, type: 'error'});
        setTimeout(() => setAlert({visible: false, message: '', type: ''}), 1500);
    }
  };
  

  return (
    
    <div className="max-w-md mx-auto relative  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
      <form onSubmit={handleSubmit} className="p-8 ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre de usuario:
          </label>
          <input name="username" value={user.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input name="password" type="password" value={user.password} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre:
          </label>
          <input name="firstName" value={user.firstName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Apellido:
          </label>
          <input name="lastName" value={user.lastName} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Teléfono:
          </label>
          <input name="phone" value={user.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            País:
          </label>
          <input name="country" value={user.country} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo electrónico:
          </label>
          <input name="email" value={user.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <button type="submit" className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Actualizar perfil</button>
      </form>
      {alert.visible && (
  <div className={`alert mt-4 ${alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white py-2 px-3 rounded`}>
    {alert.message}
  </div>
)}

    </div>
  );
  }