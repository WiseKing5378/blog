import { configureStore } from '@reduxjs/toolkit';

import CardDataSlice from './CardDataSlice';

export default configureStore({
  reducer: {
    CardDataSlice,
  },
});
