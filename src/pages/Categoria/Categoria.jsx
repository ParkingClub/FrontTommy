import React, { useEffect, useState } from 'react';
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from '../../../src/services/categoriaService';
import '../../../src/components/DataDisplay.css';
import Modal from '../../../src/components/Modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [formNombreCategoria, setFormNombreCategoria] = useState('');

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      setError("Error al cargar las categorías.");
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleAddClick = () => {
    setCurrentCategoria(null);
    setFormNombreCategoria('');
    setIsModalOpen(true);
  };

  const handleEditClick = (categoria) => {
    setCurrentCategoria(categoria);
    setFormNombreCategoria(categoria.nombreCategoria);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        await deleteCategoria(id);
        fetchCategorias();
      } catch (err) {
        console.error("Error al eliminar categoría:", err);
        alert("Error al eliminar la categoría.");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCategoria) {
        await updateCategoria(currentCategoria.idCategoria, { nombreCategoria: formNombreCategoria });
      } else {
        await createCategoria({ nombreCategoria: formNombreCategoria });
      }
      setIsModalOpen(false);
      fetchCategorias();
    } catch (err) {
      console.error("Error al guardar categoría:", err);
      alert("Error al guardar la categoría.");
    }
  };

  if (loading) {
    return <div className="loading-message">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="data-list-container">
      <div className="page-header">
        <h1>Gestión de Categorías</h1>
        <button onClick={handleAddClick} className="add-button">
          <FaPlus /> Añadir Categoría
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
            {categorias.map((categoria) => (
              <tr key={categoria.idCategoria}>
                <td>{categoria.idCategoria}</td>
                <td>{categoria.nombreCategoria}</td>
                <td className="actions">
                  <button onClick={() => handleEditClick(categoria)} className="action-button edit">
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => handleDeleteClick(categoria.idCategoria)} className="action-button delete">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentCategoria ? "Editar Categoría" : "Crear Categoría"}>
        <form onSubmit={handleFormSubmit}>
          <div className="crud-form-group">
            <label htmlFor="nombreCategoria">Nombre de Categoría:</label>
            <input
              type="text"
              id="nombreCategoria"
              value={formNombreCategoria}
              onChange={(e) => setFormNombreCategoria(e.target.value)}
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

export default Categoria;
