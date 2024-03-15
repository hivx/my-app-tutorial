import React, { useRef } from 'react';
import "./styles.css"; //import css

//tao interface co cac du lieu de truyen vao
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputFeild: React.FC<Props> = ({todo, setTodo, handleAdd}) => {
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
       onChange={(e) => setTodo(e.target.value)}
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

// import React, { useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import "./styles.css"; //import css
// import { RootState } from '../redux/store'; // Định nghĩa RootState

// interface Props {
//   // Todo không cần là string nữa, mà sẽ là một phần của Redux store
//   handleAdd: (e: React.FormEvent) => void;
// }

// const InputFeild: React.FC<Props> = ({ handleAdd }) => {
//   // Sử dụng useRef để tham chiếu đến input
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Sử dụng useSelector để lấy giá trị todo từ Redux store
//   const todo = useSelector((state: RootState) => state.input.todo);

//   // Sử dụng useDispatch để dispatch action cập nhật giá trị của todo
//   const dispatch = useDispatch();

//   // Thay đổi hàm onChange để dispatch action cập nhật giá trị của todo
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch({ type: 'SET_TODO', payload: e.target.value });
//   };

//   return (
//     <form className="input" onSubmit={(e) => {
//         handleAdd(e);
//         inputRef.current?.blur();
//     }}>
//       <input
//         ref={inputRef}
//         type="input"
//         value={todo}
//         onChange={handleChange}
//         placeholder='Enter a task'
//         className='input_box'
//       />
//       <button className="input_submit" type="submit">
//         Go
//       </button>
//     </form>
//   );
// }

// export default InputFeild;
