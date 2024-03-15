import React from 'react'
import "./styles.css";
import { Todo } from '../redux/store';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';


interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
// const TodoList = ({todos, setTodos, CompletedTodos, setCompletedTodos}: Props  ) => {//Functional Component
const TodoList: React.FC<Props> = ({ todos, setTodos, CompletedTodos, setCompletedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          //snapshot de xu ly khi keo tha cac singletodo
          (provided, snapshot) => (
            <div 
              className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} 
              ref={provided.innerRef}
              {...provided.droppableProps} //truyen du lieu vao mang
            >
            <span className="todos__heading">
              Active Tasks
            </span>
              {todos.map((todo, index) => (// lap qua cac phan tu trong mang
                  <SingleTodo
                    index={index} 
                    todo={todo}
                    key={todo.id} //tao id cho moi phan tu
                    todos={todos}
                    setTodos={setTodos}
                  />
              ))}
              {/*luu lai trang thai*/}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (
            <div 
              className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`} 
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
            <span className="todos__heading">
              Completed Tasks
            </span>
              {CompletedTodos.map((todo, index) => (// duyet cac phan tu cua mang
                  <SingleTodo
                    index={index}
                    todo={todo}
                    key={todo.id} //tao id cho moi phan tu
                    todos={CompletedTodos}
                    setTodos={setCompletedTodos}
                  />
              ))}
              {/*luu lai trang thai*/}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
};

export default TodoList;