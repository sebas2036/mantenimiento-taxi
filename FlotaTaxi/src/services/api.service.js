/**
 * Servicio base para llamadas API
 */

const API_BASE_URL = 'http://localhost:3000/api'; // Cambiar según el entorno

// Configuración por defecto para fetch
const defaultOptions = {
    headers: {
        'Content-Type': 'application/json'
    }
};

// Función helper para manejar respuestas
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la llamada API');
    }
    return response.json();
};

// Clase principal del servicio API
export class ApiService {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    // Obtener token de autenticación
    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    // Configurar headers con autenticación
    getAuthHeaders() {
        const token = this.getAuthToken();
        return token ? { 
            ...defaultOptions.headers,
            'Authorization': `Bearer ${token}`
        } : defaultOptions.headers;
    }

    // GET request
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: this.getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error en GET request:', error);
            throw error;
        }
    }

    // POST request
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error en POST request:', error);
            throw error;
        }
    }

    // PUT request
    async put(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error en PUT request:', error);
            throw error;
        }
    }

    // DELETE request
    async delete(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: this.getAuthHeaders()
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error en DELETE request:', error);
            throw error;
        }
    }

    // PATCH request
    async patch(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PATCH',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(data)
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error en PATCH request:', error);
            throw error;
        }
    }
} 