import axios from 'axios';

// process.env.REACT_APP_API_URL reads from .env file
// || 'http://localhost:8080' is the fallback if env var is missing
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// We create one axios "instance" with the base URL set
// So instead of writing: axios.get('http://localhost:8080/api/products')
// We just write:         api.get('/products')
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
