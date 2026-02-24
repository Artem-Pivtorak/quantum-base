// src/redux/auth/operations.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Допоміжні функції для заголовка авторизації
const setAuthHeader = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

// Реєстрація
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/signup', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Логін
export const logIn = createAsyncThunk(
  'auth/logIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Вихід
export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/logout');
      clearAuthHeader();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Оновлення поточного користувача
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) {
      return rejectWithValue('No token available');
    }
    setAuthHeader(token);
    try {
      const { data } = await api.get('/users/current');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
