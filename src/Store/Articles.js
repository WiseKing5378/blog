/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('Articles/fetchData', async (offset) => {
  const resp = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
  const data = await resp.json();

  return data;
});

export const getArticle = createAsyncThunk('Articles/getArticle', async (slug) => {
  const resp = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
  const data = await resp.json();
  return data;
});
export const createArticle = createAsyncThunk('Articles/createArticle', async (article) => {
  const resp = await fetch('https://blog.kata.academy/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
    body: JSON.stringify({
      article: { ...article },
    }),
  });
  const data = await resp.json();
  return data;
});

export const updateArticle = createAsyncThunk('Articles/updateArticle', async (obj) => {
  const resp = await fetch(`https://blog.kata.academy/api/articles/${obj.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
    body: JSON.stringify({
      article: { ...obj.article },
    }),
  });
  const data = await resp.json();
  return data;
});
export const deleteArticle = createAsyncThunk('Articles/deleteArticle', async (slug) => {
  const resp = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
    },
  });
  const data = await resp.json();
  return data;
});

const Articles = createSlice({
  name: 'Articles',
  initialState: {
    cardData: [],
    articlesCount: 0,
    status: 'loading',
    offset: 0,
    currentArticle: {
      title: '',
      description: '',
      tagList: [],
      updatedAt: new Date().toString(),
      body: '',
      author: { username: '' },
    },
  },
  reducers: {
    changePage(state, action) {
      state.offset = action.payload * 5 - 5;
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'ok';
      state.cardData = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [fetchData.rejected]: (state) => {
      state.status = 'error';
    },

    [getArticle.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getArticle.fulfilled]: (state, action) => {
      state.currentArticle = action.payload.article;
      state.status = 'ok';
    },

    [createArticle.fulfilled]: (state, action) => {
      state.currentArticle = action.payload.article;
      state.status = 'ok';
    },
    [updateArticle.fulfilled]: (state, action) => {
      state.currentArticle = action.payload.article;
      state.status = 'ok';
    },
  },
});
export const { changePage } = Articles.actions;
export default Articles.reducer;
