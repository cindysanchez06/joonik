import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_KEY = process.env.REACT_APP_API_KEY;


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});


api.interceptors.request.use(request => {
  return request;
});


api.interceptors.response.use(
  response => {
    console.log('=== Respuesta exitosa ===');
    return response;
  },
  error => {
    console.log('=== Error en la respuesta ===');
    return Promise.reject(error);
  }
);

export interface Location {
  id: number;
  name: string;
  url: string;
  createdAt: string;
}

export const getLocations = async (): Promise<Location[]> => {
  try {
    const response = await api.get('/api/locations');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Detalles del error:', {
        mensaje: error.message,
      });
      
      if (error.response?.status === 401) {
        throw new Error('Error de autenticación. Verifica tu API Key.');
      } else if (error.response?.status === 404) {
        throw new Error('La ruta de la API no existe. Verifica la URL.');
      } else if (!error.response) {
        throw new Error('No se pudo conectar con el servidor. Verifica que el servidor esté corriendo.');
      }
    } else {
      console.error('Error no relacionado con Axios:', error);
    }
    
    throw new Error('Error al cargar las sedes. Por favor, verifica la consola para más detalles.');
  }
}; 