/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// alexmah@a.ru 222222

export const registerUser = createAsyncThunk('User/registerUser', async (user) => {
  const resp = await fetch('https://blog.kata.academy/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user,
    }),
  });

  const data = await resp.json();
  return data;
});

export const loginUser = createAsyncThunk('User/loginUser', async (user) => {
  const resp = await fetch('https://blog.kata.academy/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      user: { ...user },
    }),
  });

  const data = await resp.json();

  return data;
});

export const updateUser = createAsyncThunk('User/updateUser', async (user) => {
  const resp = await fetch('https://blog.kata.academy/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
    body: JSON.stringify({
      user: { ...user },
    }),
  });

  const data = await resp.json();
  return data;
});

export const getCurrentUser = createAsyncThunk('User/getCurrentUser', async (token) => {
  const resp = await fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await resp.json();
  return data;
});

const User = createSlice({
  name: 'User',
  initialState: {
    user: { username: '' },
    status: 'loading',
    login: false,
    formData: null,
  },
  reducers: {
    logout(state, action) {
      state.login = action.payload;
      localStorage.clear();
    },
    getDataFromForm(state, action) {
      state.formData = action;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'ok';
      state.user = action.payload.user;
    },
    [registerUser.rejected]: (state) => {
      state.status = 'error';
    },
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.login = true;
      state.user = action.payload.user;
      localStorage.setItem('token', JSON.stringify(action.payload.user.token));
    },
    [loginUser.rejected]: (state) => {
      state.status = 'error';
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.login = true;
      state.user = action.payload.user;
    },
  },
});
export const { logout } = User.actions;
export default User.reducer;
