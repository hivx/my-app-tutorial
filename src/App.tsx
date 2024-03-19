import React, { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import InputFeild from './components/InputFeild';//import inputfeild
import { RootState, Todo } from "./redux/Store"
import { addTodo, setTodo, setTodos, setCompletedTodos } from './redux/Reducer';
import TodoList from './components/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App: React.FC = () => {
  const todo = useSelector((state: RootState) => state.todo.todo);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const completedTodos = useSelector((state: RootState) => state.todo.completedTodos);
  const dispatch = useDispatch();

  //tao su kien xu ly form ma khong load trang, khi submit
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //xu ly tao 1 input moi khi da nhap 1 cong viec
    if (todo) {
      dispatch(addTodo(todo));
      dispatch(setTodo(""));
    }
  };

  // xu ly su kien ket thuc keo tha
  // them kieu du lieu dropresult trong Typescript 
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    //dich la null
    if (!destination) {
      return;
    }
    //dich va vi tri khac nguon
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = [...todos];
    let complete = [...completedTodos];
    
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);//splice de loai bo phan tu khoi mang
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add); //splice de chen phan tu vao mang
    } else {
      complete.splice(destination.index, 0, add);
    }
    //cap nhat
    dispatch(setTodos(active));
    dispatch(setCompletedTodos(complete));
    // setcompletedTodos(complete);
  };
  return (
    //HTML
    <div className="App">
        <span className="heading"> Taskify </span>
        <InputFeild 
          todo={todo} 
          handleAdd={handleAdd}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList 
            todos={todos} 
            completedTodos={completedTodos}
          />
        </DragDropContext>
    </div>
  );
}

export default App;
