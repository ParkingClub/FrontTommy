import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MainLayout.css'; // Importar el archivo CSS

const MainLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="main-layout animated-background">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Tommy Administracion</h2>
        </div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/home">Principal</Link>
            </li>
            <li className="nav-item">
              <Link to="/categoria">Categoría</Link>
            </li>
            <li className="nav-item">
              <Link to="/marca">Marca</Link>
            </li>
            <li className="nav-item">
              <Link to="/estado">Estado</Link>
            </li>
          </ul>
        </nav>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>
      <div className="content">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </div>
    </div>
  );
};

export default MainLayout;
