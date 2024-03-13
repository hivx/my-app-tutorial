import React, { useState } from 'react'; //su dung react hook useState
import {createStore } from 'redux';
import './App.css';
import InputFeild from './components/InputFeild';//import inputfeild
import {Todo} from "./model" //import todo dung trong dong 13 tu model
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

//khai bao compponent trong react su dung Typescript
const App: React.FC = () => {
  //khai bao sate voi bien todo va setTodo de cap nhat gia tri bien todo
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); //state voi bien  todos la mang cua todo
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);

  //tao su kien xu ly form ma khong load trang, khi submit
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    //xu ly tao 1 input moi khi da nhap 1 cong viec
    if (todo) {
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  //xu ly su kien ket thuc keo tha
  //them kieu du lieu dropresult trong Typescript 
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);
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
    let active = todos;
    let complete = CompletedTodos;
    
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
    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    //HTML
    <div className="App">
        <span className="heading"> Taskify </span>
        <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList 
            todos={todos} setTodos={setTodos}
            CompletedTodos = {CompletedTodos}
            setCompletedTodos={setCompletedTodos}
          />
        </DragDropContext>
    </div>
  );
}

export default App;
