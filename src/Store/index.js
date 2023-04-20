import { configureStore } from '@reduxjs/toolkit';

import CardDataSlice from './CardDataSlice';
import User from './Authentication';

export default configureStore({
  reducer: {
    CardDataSlice,
    User,
  },
});
