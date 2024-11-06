// store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './ThemeState/themeSlice';

// Add all your reducers here
const store = configureStore({
  reducer: {
    theme: themeReducer,
  }
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Infer the type of dispatched actions
export type AppDispatch = typeof store.dispatch;

export default store;

// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Use these pre-typed hooks throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
