import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import voteReducer from '../features/votes/voteSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    votes: voteReducer
  },
});
