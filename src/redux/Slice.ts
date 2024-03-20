import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Todo } from './Store';

//luu cac bien/du lieu cua store
interface TodoState {
  todo: string;
  todos: Todo[];
  completedTodos: Todo[];
}

//load trang thai cua localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('todoState');
    if (serializedState === null) {
      return undefined; //tra ve ko xac dinh
    }
    return JSON.parse(serializedState);//co thi load todoState
  } catch (err) {//bat loi
    return undefined;
  }
};

//luu trang thai vao localStorage
const saveState = (state: TodoState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todoState', serializedState); //luu vao serializedState tuong tuong voi todoState
  } catch {
    console.log("error");//bat loi
  }
};
//gia tri khoi tao la loadstate hoac rong
const initialState: TodoState = loadState() || {
  todo: "",
  todos: [],
  completedTodos: [],
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
      saveState(state); //luu trang thai vao store sau moi slice
    },
    setCompletedTodos: (state, action: PayloadAction<Todo[]>) => {
      state.completedTodos = action.payload;
      saveState(state); //luu trang thai vao store sau moi slice
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        todo: action.payload,
        isDone: false,
      };
      state.todos.push(newTodo);
      saveState(state); //luu trang thai vao store sau moi slice
    },
    editSingle: (state, action: PayloadAction<{ id: number; todo: string }>) => {
      const { id, todo } = action.payload;
      const targetArray = state.todos.find(todo => todo.id === id) ? state.todos : state.completedTodos;
      const targetTodo = targetArray.find(todo => todo.id === id);
      if (targetTodo) {
        targetTodo.todo = todo;
      }
      saveState(state); //luu trang thai vao store sau moi slice
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.completedTodos = state.completedTodos.filter(todo => todo.id !== action.payload);
      saveState(state); //luu trang thai vao store sau moi slice
    },
    doneTodo: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const targetArray = state.todos.find(todo => todo.id === id) ? state.todos : state.completedTodos;
      const targetTodo = targetArray.find(todo => todo.id === id);
      if (targetTodo) {
        targetTodo.isDone = !targetTodo.isDone;
      }
      saveState(state); //luu trang thai vao store sau moi slice
    },
  },
});

//thu nghiem van chua xong voi todos
const selectTodoState = (state: RootState) => state.todo;

export const select = createSelector(
  selectTodoState,
  todoState => ({
    todo: todoState.todo,
  })
);

export const { setTodo, setTodos, setCompletedTodos, addTodo, editSingle, deleteTodo, doneTodo } = todoSlice.actions;
export default todoSlice.reducer;
