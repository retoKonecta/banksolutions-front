import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">
            <h2>Bienvenido al sistema</h2>
            <button className="dashboard-button" onClick={() => alert('Ir a Usuarios')}>Usuarios</button>
            <button className="dashboard-button" onClick={() => alert('Radicar Venta')}>Radicar Venta</button>
        </div>
    );
};

export default Dashboard;
