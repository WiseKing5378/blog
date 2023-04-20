/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
      user,
    }),
  });

  const data = await resp.json();
  console.log(data);
  return data;
});

const User = createSlice({
  name: 'User',
  initialState: {
    user: null,
    status: 'loading',
  },
  reducers: {},
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
      state.status = 'ok';
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state) => {
      state.status = 'error';
    },
  },
});
// export const {} = User.actions;
export default User.reducer;
