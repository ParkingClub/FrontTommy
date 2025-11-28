import React, { useEffect, useState } from 'react';
import { getMarcas, createMarca, updateMarca, deleteMarca } from '../../../src/services/marcaService';
import '../../../src/components/DataDisplay.css';
import Modal from '../../../src/components/Modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const Marca = () => {
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMarca, setCurrentMarca] = useState(null);
  const [formNombreMarca, setFormNombreMarca] = useState('');

  const fetchMarcas = async () => {
    try {
      const data = await getMarcas();
      setMarcas(data);
    } catch (err) {
      setError("Error al cargar las marcas.");
      console.error("Error al cargar marcas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleAddClick = () => {
    setCurrentMarca(null);
    setFormNombreMarca('');
    setIsModalOpen(true);
  };

  const handleEditClick = (marca) => {
    setCurrentMarca(marca);
    setFormNombreMarca(marca.nombreMarca);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta marca?")) {
      try {
        await deleteMarca(id);
        fetchMarcas();
      } catch (err) {
        console.error("Error al eliminar marca:", err);
        alert("Error al eliminar la marca (Verifica que tu API soporte la operación DELETE).");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMarca) {
        await updateMarca(currentMarca.idMarca, { nombreMarca: formNombreMarca });
      } else {
        await createMarca({ nombreMarca: formNombreMarca });
      }
      setIsModalOpen(false);
      fetchMarcas();
    } catch (err) {
      console.error("Error al guardar marca:", err);
      alert("Error al guardar la marca (Verifica que tu API soporte la operación si es edición).");
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando marcas...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="data-list-container">
      <div className="page-header">
        <h1>Gestión de Marcas</h1>
        <button onClick={handleAddClick} className="add-button">
          <FaPlus /> Añadir Marca
        </button>
      </div>

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
            {marcas.map((marca) => (
              <tr key={marca.idMarca}>
                <td>{marca.idMarca}</td>
                <td>{marca.nombreMarca}</td>
                <td className="actions">
                  <button onClick={() => handleEditClick(marca)} className="action-button edit">
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => handleDeleteClick(marca.idMarca)} className="action-button delete">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentMarca ? "Editar Marca" : "Crear Marca"}>
        <form onSubmit={handleFormSubmit}>
          <div className="crud-form-group">
            <label htmlFor="nombreMarca">Nombre de Marca:</label>
            <input
              type="text"
              id="nombreMarca"
              value={formNombreMarca}
              onChange={(e) => setFormNombreMarca(e.target.value)}
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

export default Marca;
