import React, { useState, useEffect } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [message, setMessage] = useState(null);

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const user = {
      username,
      password
    };
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guarda el token en el localStorage
        setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });

        // obtener los detalles del usuario
        const userResponse = await fetch('http://localhost:3001/user', {
          headers: {
            'Authorization': `Bearer ${data.token}` 
          }
        });

        if (userResponse.ok) {
            const userData = await userResponse.json();
            localStorage.setItem('user', userData.username);
            localStorage.setItem('id', userData.id);
            localStorage.setItem('rol', userData.rol);
          }
          
      } else {
        setMessage({ text: 'Error en el inicio de sesión', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Error en el inicio de sesión', type: 'error' });
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
// Formulario de login
  return (
      <div className="flex items-start justify-center sm:px-6 lg:px-8 pt-20">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Iniciar Sesión
            </h2>
          </div>
          {message && (
            <div className={`fixed top-0 right-0 m-6 p-4 text-black rounded shadow-lg ${message.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
              {message.text}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={e => onSubmit(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">Usuario</label>
                <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Usuario" value={username} onChange={e => onChange(e)} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Contraseña</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Contraseña" value={password} onChange={e => onChange(e)} />
              </div>
            </div>
    
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    }
    
export default Login;
