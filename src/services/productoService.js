import API_BASE_URL from '../config/apiConfig';

const getProductos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching productos:", error);
    return [];
  }
};

const getProductoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching producto with id ${id}:`, error);
    return null;
  }
};

const createProducto = async (productoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating producto:", error);
    throw error;
  }
};

const updateProducto = async (id, productoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating producto with id ${id}:`, error);
    throw error;
  }
};

const deleteProducto = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting producto with id ${id}:`, error);
    throw error;
  }
};

const getProductosByCategoria = async (idCategoria) => {
  try {
    const response = await fetch(`${API_BASE_URL}/productos/categoria/${idCategoria}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching productos by categoria ${idCategoria}:`, error);
    return [];
  }
};

export { getProductos, getProductoById, createProducto, updateProducto, deleteProducto, getProductosByCategoria };
