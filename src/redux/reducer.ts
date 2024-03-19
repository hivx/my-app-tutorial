import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './Store';

interface TodoState {
  todo: string;
  todos: Todo[];
  completedTodos: Todo[];
  // edit: boolean;
}

const initialState: TodoState = {
  todo: "",
  todos: [],
  completedTodos: [],
  // edit: false,
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      setTodo: (state, action: PayloadAction<string>) => {
        state.todo = action.payload;
      },
      setTodos: (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      },
      setCompletedTodos: (state, action: PayloadAction<Todo[]>) => {
        state.completedTodos = action.payload;
      },
      addTodo: (state, action: PayloadAction<string>) => {
        const newTodo: Todo = {
          id: Date.now(),
          todo: action.payload,
          isDone: false,
        };
        state.todos.push(newTodo);
      },
      editSingle: (state, action: PayloadAction<{ id: number; todo: string }>) => {
        const { id, todo } = action.payload;
        const targetArray = state.todos.find(todo => todo.id === id) ? state.todos : state.completedTodos;
        const targetTodo = targetArray.find(todo => todo.id === id);
        if (targetTodo) {
          targetTodo.todo = todo;
        }
      },
      deleteTodo: (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        state.completedTodos = state.completedTodos.filter(todo => todo.id !== action.payload);
      },
      doneTodo: (state, action: PayloadAction<number>) => {
        const id  = action.payload;
        const targetArray = state.todos.find(todo => todo.id === id) ? state.todos : state.completedTodos;
        const targetTodo = targetArray.find(todo => todo.id === id);
        if (targetTodo) {
          targetTodo.isDone = !targetTodo.isDone;
        }
      },
      // setEdit: (state, action: PayloadAction<number>) => {
      //   if (!state.edit && !state.todos.some(todo => todo.isDone)) {
      //     state.edit = !state.edit;
      //   }
      // },
    },
  });

export const { setTodo, setTodos, setCompletedTodos, addTodo, editSingle, deleteTodo, doneTodo } = todoSlice.actions;
export default todoSlice.reducer;
