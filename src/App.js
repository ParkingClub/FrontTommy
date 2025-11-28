import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Categoria from './pages/Categoria/Categoria';
import Marca from './pages/Marca/Marca';
import Estado from './pages/Estado/Estado';
import ProtectedRoute from './Proteccion/ProtectedRoute';
import MainLayout from "./components/MainLayout";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Ruta pública para Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas: MainLayout + Outlet */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Rutas hijas que usarán el mismo menú y cabecera */}
            <Route path="home" element={<Home />} />
            <Route path="categoria" element={<Categoria />} />
            <Route path="marca" element={<Marca />} />
            <Route path="estado" element={<Estado />} />
          </Route>

          {/* Página 404 (opcional) */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
