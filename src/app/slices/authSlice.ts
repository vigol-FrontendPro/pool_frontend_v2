import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../slices/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('user'),
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
  const response = await axios.post('/api/login', new URLSearchParams(credentials), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true
  });
  return response.data.user;
});

export const registerUser = createAsyncThunk('auth/register', async (userData: User) => {
  const response = await axios.post('/api/users/register', userData, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await axios.post('/api/logout', {}, { withCredentials: true });
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = 'Неверный логин или пароль';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = 'Ошибка регистрации';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem('user');
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
