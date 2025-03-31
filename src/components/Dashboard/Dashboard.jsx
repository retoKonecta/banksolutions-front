import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import UserList from '../Users/UserList';
import SaleForm from '../Sales/SaleForm';
import UserForm from '../Users/UserForm';

const Dashboard = () => {
  const [view, setView] = useState('');
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [saleToEdit, setSaleToEdit] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkUserRole();
    fetchUsers();
    fetchSales();
  }, []);

  const checkAuth = (response) => {
    if (response.status === 401) {
      localStorage.removeItem('token');
      navigate('/login');
      return false;
    }
    return true;
  };

  const checkUserRole = () => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  };

  const fetchUsers = async () => {
    if (role === 'asesor') return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/getUsers', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!checkAuth(response)) return;

      if (!response.ok) throw new Error('Error en la red');

      const data = await response.json();
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
    }
  };

  const fetchSales = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/getSales', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!checkAuth(response)) return;

      if (!response.ok) throw new Error('Error en la red');

      const data = await response.json();
      setSales(data.data.response);
    } catch (error) {
      console.error('Error obteniendo ventas:', error);
    }
  };

  const handleEditSale = (sale) => {
    setSaleToEdit(sale);
  };

  const handleDeleteSale = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/deleteSales/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!checkAuth(response)) return;

      if (response.ok) {
        alert('Venta eliminada correctamente');
        fetchSales();
      } else {
        alert('Error al eliminar la venta');
      }
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (role === 'asesor') return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/deleteUser/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!checkAuth(response)) return;

      if (response.ok) {
        alert('Usuario eliminado correctamente');
        fetchUsers();
      } else {
        alert('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Bienvenido al sistema</h2>

      <div className="buttons-container">
        {role !== 'asesor' && (
          <>
            <button className="dashboard-button" onClick={() => setView('users')}>
              Usuarios
            </button>
            <button className="dashboard-button" onClick={() => setView('user_create')}>
              Crear usuario
            </button>
          </>
        )}
        <button className="dashboard-button" onClick={() => setView('radicar')}>
          Radicar Venta
        </button>
      </div>

      {view === 'users' && role !== 'asesor' && <UserList users={users} onDelete={handleDeleteUser} />}
      {view === 'user_create' && role !== 'asesor' && <UserForm fetchUsers={fetchUsers} />}
      {view === 'radicar' && <SaleForm fetchSales={fetchSales} saleToEdit={saleToEdit} clearEdit={() => setSaleToEdit(null)} />}

      <div className="ventas-container">
        <h3>Lista de Productos Radicados</h3>
        <table className="dashboard-table styled-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Cupo Solicitado</th>
              <th>Franquicia</th>
              <th>Tasa</th>
              <th>Estado</th>
              <th>Creado Por</th>
              <th>Editado Por</th>
              <th>Fecha Creación</th>
              <th>Última Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.product}</td>
                  <td>{sale.requestedLimit}</td>
                  <td>{sale.franchise}</td>
                  <td>{sale.rate || 'N/A'}</td>
                  <td>{sale.status}</td>
                  <td>{sale.creator.email}</td>
                  <td>{sale.editor.email}</td>
                  <td>{new Date(sale.createdAt).toLocaleString()}</td>
                  <td>{new Date(sale.updatedAt).toLocaleString()}</td>
                  <td>
                    {role !== 'asesor' && (
                      <>
                        <button className="edit-btn" onClick={() => handleEditSale(sale)}>Editar</button>
                        <button className="delete-btn" onClick={() => handleDeleteSale(sale.id)}>Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No hay ventas registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
