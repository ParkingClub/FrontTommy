import API_BASE_URL from '../config/apiConfig';

const getCategorias = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categorias:", error);
    return [];
  }
};

const getCategoriaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching categoria with id ${id}:`, error);
    return null;
  }
};

const createCategoria = async (categoriaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoriaData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating categoria:", error);
    throw error; // Re-throw para que el componente pueda manejarlo
  }
};

const updateCategoria = async (id, categoriaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoriaData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating categoria with id ${id}:`, error);
    throw error; // Re-throw para que el componente pueda manejarlo
  }
};

const deleteCategoria = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categorias/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // Indicador de éxito
  } catch (error) {
    console.error(`Error deleting categoria with id ${id}:`, error);
    throw error; // Re-throw para que el componente pueda manejarlo
  }
};

export { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria };
