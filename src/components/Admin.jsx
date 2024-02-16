import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [confirmDelete, setConfirmDelete] = useState({ show: false, userId: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/allusers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Hubo un error al obtener los datos de los usuarios:', error));
  }, []);

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message });
  };

  const handleUpdate = (id) => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/user/${id}`;
    const body = { ...editingUser, password: newPassword };
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el usuario');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      loadUsers();
      setEditingUser(null);
      showAlert(true, 'success', 'Usuario editado con éxito');
    })
    .catch(error => {
      console.error('Hubo un error al actualizar el usuario:', error);
      showAlert(true, 'error', 'Hubo un error al editar el usuario');
    });
  };
  
    

  const handleDelete = (id) => {
    setConfirmDelete({ show: true, userId: id });
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3001/user/${confirmDelete.userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al borrar el usuario');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      loadUsers();
      setConfirmDelete({ show: false, userId: null });
      showAlert(true, 'success', 'Usuario borrado con éxito');
    })
    .catch(error => {
      console.error('Hubo un error al borrar el usuario:', error);
      showAlert(true, 'error', 'Hubo un error al borrar el usuario');
    });
  };

  // Función para cargar los usuarios
  const loadUsers = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/allusers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch(error => console.error('Hubo un error al obtener los datos de los usuarios:', error));
  };

  // Llama a loadUsers en useEffect para cargar los usuarios cuando se monta el componente
  useEffect(() => {
    loadUsers();
  }, []);
    return (
        <div className="relative">
          {alert.show && (
            <div className={`absolute top-0 right-0 m-4 p-2 rounded-md ${alert.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {alert.message}
            </div>
          )}
          {confirmDelete.show && (
            <div className="absolute top-0 right-0 m-8 p-2 rounded-md bg-red-500 text-white">
              ¿Estás seguro de que quieres borrar este usuario?
              <button onClick={handleConfirmDelete} className="bg-white text-red-500 font-bold py-1 px-2 rounded ml-4">
                Sí
              </button>
              <button onClick={() => setConfirmDelete({ show: false, userId: null })} className="bg-white text-red-500 font-bold py-1 px-2 rounded ml-4">
                No
              </button>
            </div>
          )}
          <h1 className="text-2xl font-bold mb-4 ml-4 items-center justify-center text-white">Lista de Usuarios</h1>
          
          <div className=" flex-col items-center ml-4 mr-4 justify-center grid grid-cols-4 gap-4">
    
            {Array.isArray(users) && users.map((user, index) => (
              <div key={index} className="bg-white p-4 rounded-md mb-4 w-full max-w-md shadow-lg">
                <h2 className="text-xl font-bold text-black">Usuario: {user.username}</h2>
                <p className="text-black">Contraseña: <span className='font-bold'>{"Encriptada"}</span></p>
                <p className="text-black">Nombre: {user.firstName}</p>
                <p className="text-black">Apellido: {user.lastName}</p>
                <p className="text-black">Numero de telefono: {user.phone}</p>
                <p className="text-black">Pais: {user.country}</p>
                <p className="text-black">Email: {user.email}</p>
                <p className="text-black">Rol: {user.rol}</p>
                <button onClick={() => setEditingUser(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Editar
                </button>
                <button onClick={() => { handleDelete(user._id) }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
                  Borrar
                </button>
              </div>
            ))}
            {editingUser && (
              <div className="fixed inset-0 w-full h-full flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-md mb-4 w-full max-w-md shadow-lg">
                  <h2 className="text-xl font-bold text-black">Editar Usuario</h2>
                  <label className="block text-black">Nombre de usuario</label>
                  <input type="text" value={editingUser.username} onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Nueva contraseña</label>
                  <input type="password" onChange={(e) => setNewPassword(e.target.value)} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Nombre</label>
                  <input type="text" value={editingUser.firstName} onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Apellido</label>
                  <input type="text" value={editingUser.lastName} onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Numero de Telefono</label>
                  <input type="text" value={editingUser.phone} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Pais</label>
                  <input type="text" value={editingUser.country} onChange={(e) => setEditingUser({ ...editingUser, country: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                 
                  <label className="block text-black">Email</label>
                  <input type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <label className="block text-black">Rol</label>
                  <input type="text" value={editingUser.rol} onChange={(e) => setEditingUser({ ...editingUser, rol: e.target.value })} className="border-2 border-gray-200 p-2 rounded-md mb-4 w-full" />
                  <button onClick={() => handleUpdate(editingUser._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                    Guardar
                  </button>
                  <button onClick={() => setEditingUser(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    );}
export default Admin;
