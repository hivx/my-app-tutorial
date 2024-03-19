import React from 'react'
import "./Styles.css";
import { Todo } from '../redux/Store';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';


interface Props {
  todos: Todo[];
  completedTodos: Todo[];
}
// const TodoList = ({todos, setTodos, CompletedTodos, setCompletedTodos}: Props  ) => {//Functional Component
const TodoList: React.FC<Props> = ({todos, completedTodos}) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {//snapshot de xu ly khi keo tha cac singletodo
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
                key={todo.id} //lay id cho moi phan tu
              />
          ))}
          {/*luu lai trang thai*/}
          {provided.placeholder}
          </div>
          )
        }
        </Droppable>
        <Droppable droppableId="Completed Tasks">
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
          {completedTodos.map((todo, index) => (// lap qua cac phan tu trong mang
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id} //lay id cho moi phan tu
              />
          ))}
          {/*luu lai trang thai*/}
          {provided.placeholder}            
          </div>
          )
        }
      </Droppable>
    </div>
  );
};

export default TodoList;