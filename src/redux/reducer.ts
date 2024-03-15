import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './store';

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        todo: action.payload,
        isDone: false,
      };
      state.todos.push(newTodo);
    },
    editTodo: (state, action: PayloadAction<{ id: number; todo: string }>) => {
      const todoToEdit = state.todos.find(todo => todo.id === action.payload.id);
      if (todoToEdit) {
        todoToEdit.todo = action.payload.todo;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    doneTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
  },
});

export const { addTodo, editTodo, deleteTodo, doneTodo } = todoSlice.actions;
export default todoSlice.reducer;
