//Xu ly tung todo mot
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../model';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete, MdOutlineDone } from 'react-icons/md';
import "./styles.css";
import { Draggable } from 'react-beautiful-dnd';

//dung interface cung duoc
type Props = {
  index: number;
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

const SingleTodo  = ({index, todo, todos, setTodos}: Props) => {
  //khai bao state voi bien  edit de cap nhap trang thai edittodo
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo) //luu tru noi dung ban dau cua todo
  
  //chuyen doi gia tri isDone
  const handleDone = (id: number) => {
    //cap nhat gia tri bien todos
    setTodos(
      //map de duyet qua tat cac phan tu trong mang
      todos.map((todo)=>
      //bieu thuc dieu kien de chuyen doi isDone
        todo.id === id ? {...todo, isDone : !todo.isDone }: todo 
      )
    );
  };

  const handleDelete = (id: number) => {
    //filter de tao mang moi gom cac phan tu thoa man dieu kien
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (
        todo.id === id ? {...todo, todo:editTodo} : todo
      ))
    );
    setEdit(false);
  };

  //tham chieu vao element input
  const inputRef = useRef<HTMLInputElement>(null);

  //khi tham chieu khac null va gia tri edit thay doi se focus va input
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]); //edit thay doi false or true
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
          //HTML (JSX)
          <form 
            className={`todos__single ${snapshot.isDragging ? "drag" : ""}`} //tao dieu kien cho classname
            onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            { edit ? (
              //input cho phep chinh sua todo
              <input
                ref={inputRef} 
                value={editTodo} onChange={(e) => setEditTodo(e.target.value)}
                className="todos__single--text"
              />
              ) : (
                todo.isDone ? (
                  //<s /> la viet van ban voi phan gach ngang, span thi khong
                  <s className="todos__single--text">
                    {todo.todo}
                  </s>) : (
                  <span className="todos__single--text">
                    {todo.todo}
                  </span>
                )
              )
            }

            <div>
              {/* doi gia tri edit */}
                <span className="icon"  onClick={() =>{
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}>
                  <CiEdit />
                </span>
                <span className="icon"  onClick={() => handleDelete(todo.id)}>
                  <MdOutlineDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                  <MdOutlineDone />
                </span>
            </div>
          </form>
        )
      }   
    </Draggable>
  

  )
}

export default SingleTodo;