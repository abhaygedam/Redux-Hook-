

import { ADD_COUNT, REMOVE_COUNT, ADD_TODO, ADD_TODO_LOADING, ADD_TODO_SUCESS, ADD_TODO_ERROR, GET_TODO_SUCESS, GET_TODO_LOADING, GET_TODO_ERROR } from "./actionsType.js";



export const initialState = {
    counter: 0,
    todos: {
        isLoading: false,
        isError: false,
        data:[],
    }
}

export const TodoReducerFn = (state = initialState, { type, payload }) => {
    
    switch (type) {
        case ADD_COUNT:
            return {
                ...state,
                counter: state.counter + payload,
            }
        case REMOVE_COUNT:
            return {
                ...state,
                    counter: state.counter - payload,
            };
        case ADD_TODO_LOADING:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    isLoading: true
                }
            }
        case ADD_TODO_SUCESS:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    isLoading: false,
                }
            }
        case ADD_TODO_ERROR:
            return {
                  ...state,
                todos: {
                    ...state.todos,
                    isLoading: false,
                    isError: true,
                }
            }
          case GET_TODO_LOADING:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    isLoading: true
                }
            }
        case GET_TODO_SUCESS:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    isLoading: false,
                    data: [...payload],
                }
            }
        case GET_TODO_ERROR:
            return {
                  ...state,
                todos: {
                    ...state.todos,
                    isLoading: false,
                    isError: true,
                }
            }
        default:
            return { ...state };
    }
};


class Store{
    constructor(TodoReducerFn, initialState) {
        this.reducer = TodoReducerFn;
        this.state = initialState;
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action);
    }
}
