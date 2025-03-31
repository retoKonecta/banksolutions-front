import React from 'react';
import '../Dashboard/Dashboard.css';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <table className="dashboard-table styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(user)}>Editar</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
