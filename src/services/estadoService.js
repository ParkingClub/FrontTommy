import API_BASE_URL from '../config/apiConfig';

const getEstados = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/estados`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching estados:", error);
    return [];
  }
};

const createEstado = async (estadoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/estados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating estado:", error);
    throw error;
  }
};

// Si necesitas actualizar o eliminar estados, tu API de backend debe soportarlo.
// Por ahora, solo los incluiremos como placeholders si el patrón es el mismo que Categorías.
const getEstadoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/estados/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching estado with id ${id}:`, error);
    return null;
  }
};

const updateEstado = async (id, estadoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/estados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estadoData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating estado with id ${id}:`, error);
    throw error;
  }
};

const deleteEstado = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/estados/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting estado with id ${id}:`, error);
    throw error;
  }
};

export { getEstados, createEstado, getEstadoById, updateEstado, deleteEstado };
