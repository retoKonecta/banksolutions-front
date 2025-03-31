import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';
import { FaUserCircle } from "react-icons/fa"; 

const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = (e) => {
        e.preventDefault();
        
        console.log({ username, password });


        if (username && password) {
            navigate('/dashboard'); 
        } else {
            alert("Por favor, completa los campos");
        }
    };

    return (
        <div className="login-container">
            <FaUserCircle className="user-icon" />
            <form className='custom-form'>
                <label className="custom-label">Username:</label>
                <input 
                    onChange={(event) => setUsername(event.target.value)} 
                    placeholder='username' 
                    className="custom-input" 
                    type='text'
                />
                <label className="custom-label">Password:</label>
                <input 
                    onChange={(event) => setPassword(event.target.value)} 
                    placeholder='password' 
                    className="custom-input" 
                    type="password" 
                />
                <button className="custom-button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;
