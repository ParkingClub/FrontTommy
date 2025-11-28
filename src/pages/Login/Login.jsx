
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import { FaRobot } from 'react-icons/fa'; // Importar el icono de robot

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'tommy' && password === '1234') {
      login();
      navigate('/home');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-icon">
          <FaRobot />
        </div>
        <h1>Tommy IA</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
