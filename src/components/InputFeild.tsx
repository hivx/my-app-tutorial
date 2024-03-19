import React, { useRef } from 'react';
import "./Styles.css"; //import css
import { setTodo } from '../redux/Reducer';
import { useDispatch } from 'react-redux';

//tao interface co cac du lieu de truyen vao
interface Props {
  todo: string;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({todo, handleAdd}) => {
  const dispatch = useDispatch();
  //tao bien inputRef de tham chieu den 1 phan tu trong html, o day la input_box
  const inputRef = useRef<HTMLInputElement> (null);
  return (
    //xu ly su kien khi nhan gui
    <form className="input" onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur(); //xu ly loai bo trang thai focus, dau ? de xac dinh nut hien tai co null khong
    }}>
      
      <input //HTML de tao o nhap lieu
       ref={inputRef}
       type="input"
       value={todo}
       onChange={(e) => dispatch(setTodo(e.target.value))}
       placeholder='Enter a task'
       className='input_box'
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  )
}

export default InputFeild; //export ra de co the import