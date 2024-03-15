import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './reducer';

//khai bao 1 interface todo trong typescript
export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}


export const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});


export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;