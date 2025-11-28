import React, { useEffect, useState } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto, getProductosByCategoria } from '../../../src/services/productoService';
import { getCategorias } from '../../../src/services/categoriaService';
import { getMarcas } from '../../../src/services/marcaService';
import { getEstados } from '../../../src/services/estadoService';
import '../../../src/components/DataDisplay.css';
import Modal from '../../../src/components/Modal';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Importar iconos

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-eye"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImageUrl, setModalImageUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategoria, setSelectedCategoria] = useState(1); // Categoría 1 por defecto

  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formTipo, setFormTipo] = useState('');
  const [formCodigo, setFormCodigo] = useState('');
  const [formNParte, setFormNParte] = useState('');
  const [formCompatibilidad, setFormCompatibilidad] = useState('');
  const [formImagenUrl, setFormImagenUrl] = useState('');
  const [formIdCategoria, setFormIdCategoria] = useState('');
  const [formIdMarca, setFormIdMarca] = useState('');
  const [formIdEstado, setFormIdEstado] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [estados, setEstados] = useState([]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [productosData, categoriasData, marcasData, estadosData] = await Promise.all([
        // Si selectedCategoria es 0 o null/undefined, get all products, else get by category
        selectedCategoria ? getProductosByCategoria(selectedCategoria) : getProductos(),
        getCategorias(),
        getMarcas(),
        getEstados(),
      ]);
      setProductos(productosData);
      setCategorias(categoriasData);
      setMarcas(marcasData);
      setEstados(estadosData);
    } catch (err) {
      setError("Error al cargar datos.");
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [selectedCategoria]); // Re-fetch data when selectedCategoria changes

  const handleImageClick = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const handleModalClose = () => {
    setModalImageUrl(null);
  };

  const handleAddClick = () => {
    setCurrentProduct(null);
    setFormTipo('');
    setFormCodigo('');
    setFormNParte('');
    setFormCompatibilidad('');
    setFormImagenUrl('');
    setFormIdCategoria('');
    setFormIdMarca('');
    setFormIdEstado('');
    setIsCrudModalOpen(true);
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setFormTipo(product.tipo || '');
    setFormCodigo(product.codigo || '');
    setFormNParte(product.nparte || '');
    setFormCompatibilidad(product.compatibilidad || '');
    setFormImagenUrl(product.imagenUrl || '');
    setFormIdCategoria(product.idCategoria || '');
    setFormIdMarca(product.idMarca || '');
    setFormIdEstado(product.idEstado || '');
    setIsCrudModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProducto(id);
        fetchAllData();
      } catch (err) {
        console.error("Error al eliminar producto:", err);
        alert("Error al eliminar el producto.");
      }
    }
  };

  const handleCrudFormSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      tipo: formTipo,
      codigo: formCodigo,
      nParte: formNParte,
      compatibilidad: formCompatibilidad,
      imagenUrl: formImagenUrl,
      idCategoria: parseInt(formIdCategoria, 10),
      idMarca: parseInt(formIdMarca, 10),
      idEstado: parseInt(formIdEstado, 10),
    };

    try {
      if (currentProduct) {
        await updateProducto(currentProduct.idProducto, productData);
      } else {
        await createProducto(productData);
      }
      setIsCrudModalOpen(false);
      fetchAllData();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      alert("Error al guardar el producto.");
    }
  };

  const filteredProductos = productos.filter(
    (producto) =>
      (producto.tipo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.codigo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.nombreCategoria || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.nombreMarca || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.nombreEstado || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.nparte || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.compatibilidad || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-message">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="data-list-container">
      <div className="page-header">
        <h1>Gestión de Productos</h1>
        <input
          type="text"
          placeholder="Buscar productos..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(parseInt(e.target.value, 10))}
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((cat) => (
            <option key={cat.idCategoria} value={cat.idCategoria}>
              {cat.nombreCategoria}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddClick} className="add-button">
        <FaPlus /> Añadir Producto
      </button>

      <div className="data-cards-scroll-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Código</th>
              <th>Categoría</th>
              <th>Marca</th>
              <th>Estado</th>
              <th>N/Parte</th>
              <th>Compatibilidad</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.map((producto) => (
              <tr key={producto.idProducto}>
                <td>{producto.tipo}</td>
                <td>{producto.codigo}</td>
                <td>{producto.nombreCategoria}</td>
                <td>{producto.nombreMarca}</td>
                <td>{producto.nombreEstado}</td>
                <td>{producto.nparte}</td>
                <td className="text-ellipsis">{producto.compatibilidad}</td>
                <td>
                  {producto.imagenUrl && (
                    <div
                      className="view-image-icon"
                      onClick={() => handleImageClick(producto.imagenUrl)}
                    >
                      <EyeIcon />
                    </div>
                  )}
                </td>
                <td className="actions">
                  <button onClick={() => handleEditClick(producto)} className="action-button edit">
                    <FaEdit /> Editar
                  </button>
                  <button onClick={() => handleDeleteClick(producto.idProducto)} className="action-button delete">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalImageUrl && (
        <div className="image-modal" onClick={handleModalClose}>
          <img src={modalImageUrl} alt="Producto" />
        </div>
      )}

      <Modal isOpen={isCrudModalOpen} onClose={() => setIsCrudModalOpen(false)} title={currentProduct ? "Editar Producto" : "Crear Producto"}>
        <form onSubmit={handleCrudFormSubmit}>
          <div className="crud-form-group">
            <label htmlFor="tipo">Tipo:</label>
            <input type="text" id="tipo" value={formTipo} onChange={(e) => setFormTipo(e.target.value)} required />
          </div>
          <div className="crud-form-group">
            <label htmlFor="codigo">Código:</label>
            <input type="text" id="codigo" value={formCodigo} onChange={(e) => setFormCodigo(e.target.value)} required />
          </div>
          <div className="crud-form-group">
            <label htmlFor="nParte">N/Parte:</label>
            <input type="text" id="nParte" value={formNParte} onChange={(e) => setFormNParte(e.target.value)} required />
          </div>
          <div className="crud-form-group">
            <label htmlFor="compatibilidad">Compatibilidad:</label>
            <textarea id="compatibilidad" value={formCompatibilidad} onChange={(e) => setFormCompatibilidad(e.target.value)} rows="3"></textarea>
          </div>
          <div className="crud-form-group">
            <label htmlFor="imagenUrl">URL de Imagen:</label>
            <input type="url" id="imagenUrl" value={formImagenUrl} onChange={(e) => setFormImagenUrl(e.target.value)} />
          </div>
          <div className="crud-form-group">
            <label htmlFor="idCategoria">Categoría:</label>
            <select id="idCategoria" value={formIdCategoria} onChange={(e) => setFormIdCategoria(e.target.value)} required>
              <option value="">Selecciona una categoría</option>
              {categorias.map(cat => (
                <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
              ))}
            </select>
          </div>
          <div className="crud-form-group">
            <label htmlFor="idMarca">Marca:</label>
            <select id="idMarca" value={formIdMarca} onChange={(e) => setFormIdMarca(e.target.value)} required>
              <option value="">Selecciona una marca</option>
              {marcas.map(mar => (
                <option key={mar.idMarca} value={mar.idMarca}>{mar.nombreMarca}</option>
              ))}
            </select>
          </div>
          <div className="crud-form-group">
            <label htmlFor="idEstado">Estado:</label>
            <select id="idEstado" value={formIdEstado} onChange={(e) => setFormIdEstado(e.target.value)} required>
              <option value="">Selecciona un estado</option>
              {estados.map(est => (
                <option key={est.idEstado} value={est.idEstado}>{est.nombreEstado}</option>
              ))}
            </select>
          </div>
          <div className="crud-form-actions">
            <button type="submit" className="submit">Guardar</button>
            <button type="button" onClick={() => setIsCrudModalOpen(false)} className="cancel">Cancelar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
