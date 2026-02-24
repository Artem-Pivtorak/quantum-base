// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://connections-api.goit.global',
});

// Тепер виводимо вже після ініціалізації
console.log('API baseURL is', api.defaults.baseURL);

export default api;
