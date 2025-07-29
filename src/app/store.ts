import {
  type TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { usersSlice } from '../features/slices/usersSlice';
import { skillsSlice } from '../features/slices/skillsSlice';
import { authSlice } from '@/features/slices/authSlice';

export const rootReducer = combineReducers({
  [usersSlice.name]: usersSlice.reducer,
  [skillsSlice.name]: skillsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
