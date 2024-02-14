import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 1) {
      setAlert('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }

    if (password.length < 1) {
      setAlert('La contraseña debe tener al menos 5 caracteres');
      return;
    }

    const formData = {
      username,
      password,
      firstName,
      lastName,
      email
    };

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.success);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setAlert(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {alert && <div className="fixed top-0 right-0 w-1/3 p-4 mb-4 text-center text-white bg-red-500 rounded shadow-lg">{alert}</div>}
      {success && <div className="fixed top-0 right-0 w-1/3 p-4 mb-4 text-center text-white bg-green-500 rounded shadow-lg">{success}</div>}
      <form onSubmit={handleSubmit} className="w-full p-6 bg-white rounded shadow-md">
        <label className="block mb-2 text-black">Nombre de usuario</label>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Contraseña</label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Nombre</label>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Apellido</label>
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <label className="block mb-2 text-black">Correo electrónico</label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 mb-3 border rounded" />
        <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
}
