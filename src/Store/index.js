import { configureStore } from '@reduxjs/toolkit';

import User from './Authentication';
import Articles from './Articles';

export default configureStore({
  reducer: {
    User,
    Articles,
  },
});
