import API_BASE_URL from '../config/apiConfig';

const getMarcas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/marcas`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching marcas:", error);
    return [];
  }
};

const createMarca = async (marcaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/marcas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marcaData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating marca:", error);
    throw error;
  }
};

// Si necesitas actualizar o eliminar marcas, tu API de backend debe soportarlo.
// Por ahora, solo los incluiremos como placeholders si el patrón es el mismo que Categorías.
const getMarcaById = async (id) => {
  // Este método no estaba en tu colección de Postman para Marcas.
  // Se incluye por consistencia si tu API lo soporta.
  try {
    const response = await fetch(`${API_BASE_URL}/marcas/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching marca with id ${id}:`, error);
    return null;
  }
};

const updateMarca = async (id, marcaData) => {
  // Este método no estaba en tu colección de Postman para Marcas.
  // Se incluye por consistencia si tu API lo soporta.
  try {
    const response = await fetch(`${API_BASE_URL}/marcas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(marcaData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating marca with id ${id}:`, error);
    throw error;
  }
};

const deleteMarca = async (id) => {
  // Este método no estaba en tu colección de Postman para Marcas.
  // Se incluye por consistencia si tu API lo soporta.
  try {
    const response = await fetch(`${API_BASE_URL}/marcas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting marca with id ${id}:`, error);
    throw error;
  }
};

export { getMarcas, createMarca, getMarcaById, updateMarca, deleteMarca };
