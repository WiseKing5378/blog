/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('CardData/fetchData', async (offset) => {
  const resp = await fetch(`https://blog.kata.academy/api/articles?offset=${offset}`);
  const data = await resp.json();

  return data;
});

const CardDataSlice = createSlice({
  name: 'CardData',
  initialState: {
    cardData: [],
    articlesCount: 0,
    status: 'loading',
    offset: 0,
  },
  reducers: {
    changePage(state, action) {
      state.offset += action.payload;
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
  },
});
export const { changePage } = CardDataSlice.actions;
export default CardDataSlice.reducer;
