//Xu ly tung todo
import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../redux/Store';
import { CiEdit } from 'react-icons/ci';
import { MdOutlineDelete, MdOutlineDone } from 'react-icons/md';
import "./Styles.css";
import {useDispatch} from 'react-redux'
import { Draggable } from 'react-beautiful-dnd';
import { doneTodo, deleteTodo, editSingle } from '../redux/Slice';

//dung interface cung duoc
type Props = {
  index: number;
  todo: Todo,
}

const SingleTodo  = ({index, todo}:Props) => {
  //khai bao state voi bien edit de cap nhap trang thai edittodo
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const dispatch = useDispatch();

  //chuyen doi gia tri isDone
  const handleDone = (id: number) => {  
    dispatch(doneTodo(id));
  };
  //xoa todo theo id
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleEdit = (e: React.FormEvent, id: number, todo: string) => {
    e.preventDefault();

    dispatch(editSingle({id, todo: editTodo}));
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
            onSubmit={(e) => handleEdit(e, todo.id, editTodo)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            { edit ? (
              //input cho phep chinh sua todo
              <input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
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
};

export default SingleTodo;