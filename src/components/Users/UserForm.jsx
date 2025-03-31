import { useState } from 'react';
import './UserForm.css';

const UserForm = ({ fetchUsers }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/addUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Usuario agregado con éxito');
        if (fetchUsers) {
          fetchUsers(); 
        }
        setUserData({ name: '', email: '', password: '', role: '' });
      } else {
        alert('Error al agregar usuario');
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error);
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        required
      />

      <label>Correo Electrónico:</label>
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        required
      />

      <label>Contraseña:</label>
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        required
      />

      <label>Tipo de Usuario:</label>
      <select name="role" value={userData.role} onChange={handleChange} required>
        <option value="">Seleccione un rol</option>
        <option value="Administrador">Administrador</option>
        <option value="Asesor">Asesor</option>
      </select>

      <button type="submit">Guardar Usuario</button>
    </form>
  );
};

export default UserForm;
