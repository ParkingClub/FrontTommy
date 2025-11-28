import React, { useEffect, useState } from 'react';
import { getEstados, createEstado, updateEstado, deleteEstado } from '../../../src/services/estadoService';
import '../../../src/components/DataDisplay.css';
import Modal from '../../../src/components/Modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const Estado = () => {
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEstado, setCurrentEstado] = useState(null);
  const [formNombreEstado, setFormNombreEstado] = useState('');

  const fetchEstados = async () => {
    try {
      const data = await getEstados();
      setEstados(data);
    } catch (err) {
      setError("Error al cargar los estados.");
      console.error("Error al cargar estados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstados();
  }, []);

  const handleAddClick = () => {
    setCurrentEstado(null);
    setFormNombreEstado('');
    setIsModalOpen(true);
  };

  const handleEditClick = (estado) => {
    setCurrentEstado(estado);
    setFormNombreEstado(estado.nombreEstado);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este estado?")) {
      try {
        await deleteEstado(id);
        fetchEstados();
      } catch (err) {
        console.error("Error al eliminar estado:", err);
        alert("Error al eliminar el estado (Verifica que tu API soporte la operación DELETE).");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEstado) {
        await updateEstado(currentEstado.idEstado, { nombreEstado: formNombreEstado });
      } else {
        await createEstado({ nombreEstado: formNombreEstado });
      }
      setIsModalOpen(false);
      fetchEstados();
    } catch (err) {
      console.error("Error al guardar estado:", err);
      alert("Error al guardar el estado (Verifica que tu API soporte la operación si es edición).");
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando estados...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="data-list-container">
      <h1>Gestión de Estados</h1>
      <button onClick={handleAddClick} className="add-button">
        <FaPlus /> Añadir Estado
      </button>

      <div className="data-cards-scroll-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estados.map((estado) => (
              <tr key={estado.idEstado}>
                <td>{estado.idEstado}</td>
                <td>{estado.nombreEstado}</td>
                <td className="actions">
                  <button onClick={() => handleEditClick(estado)} className="action-button edit">
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => handleDeleteClick(estado.idEstado)} className="action-button delete">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentEstado ? "Editar Estado" : "Crear Estado"}>
        <form onSubmit={handleFormSubmit}>
          <div className="crud-form-group">
            <label htmlFor="nombreEstado">Nombre de Estado:</label>
            <input
              type="text"
              id="nombreEstado"
              value={formNombreEstado}
              onChange={(e) => setFormNombreEstado(e.target.value)}
              required
            />
          </div>
          <div className="crud-form-actions">
            <button type="submit" className="submit">Guardar</button>
            <button type="button" onClick={() => setIsModalOpen(false)} className="cancel">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Estado;
