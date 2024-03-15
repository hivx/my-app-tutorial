import { Todo } from "./store";

// export const ADD_TODO = 'ADD_TODO';

export type Actions =
    | {type: 'add', payload: string}
    | {type: 'edit', payload: string}
    | {type: 'delete', payload: number}
    | {type: 'done', payload: number};



// export const addTodo = (todo: Todo) => async (dispatch, getState) => {
//     dispatch ({
        
        
//     })
// }

