import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './Reducer';

export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;