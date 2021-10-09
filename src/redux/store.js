import { createStore } from "redux";
import { TodoReducerFn, initialState } from "./reducer.js";






export const store = new createStore(TodoReducerFn, initialState);



// store.dispatch(addCount(1));
// store.dispatch(addCount(1));

// console.log(store.getState());

// store.dispatch(removeCount(1));

// store.dispatch(addTodo({ id: 1, status: false, title: "Learn Redux" }));

// console.log(store.getState());