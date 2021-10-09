import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Switch, Link } from "react-router-dom";
import { addTodo, addTodoSucess, addTodoError, addTodoLoading, getTodoSucess, getTodoLoading, getTodoError } from "../redux/action";

 
export const Todos = () => {

    const [text, setText] = useState([]);

    useEffect(() => {
        handleGetTodo();
    }, []);

    const { data, isLoading, isError } = useSelector((state) => state.todos);
    console.log(data);

    const handleAddTodo = async () => {
        dispatch(addTodoLoading());
        try {
            const res = await axios.post("http://localhost:3005/todos", {
                status: false,
                tittle: text,
            });
            dispatch(addTodoSucess(res.data));
             handleGetTodo();
        }
        catch (e) {
            dispatch(addTodoError(e.message))
        }
    }

     const handleGetTodo = async () => {
        dispatch(getTodoLoading());
        try {
            const res = await axios.get("http://localhost:3005/todos");
            console.log("res", res.data);

            dispatch(getTodoSucess(res.data));
        }
        catch (e) {
            dispatch(getTodoError(e.message))
        }
    }
    
   
    const handleTogle = async (id, stat) => {
         try {
            const res = await axios.patch(`http://localhost:3005/todos/${id}`, {
                status: !stat,
            });
            dispatch(addTodoSucess(res.data));
             handleGetTodo();
        }
        catch (e) {
            dispatch(addTodoError(e.message))
        }
    }

    const handleDelete = async (id) => {
         try {
            const res = await axios.delete(`http://localhost:3005/todos/${id}`);
            dispatch(addTodoSucess(res.data));
             handleGetTodo();
        }
        catch (e) {
            dispatch(addTodoError(e.message))
        }
    }

    const dispatch = useDispatch();
    return isLoading ? ("Loading...") : isError ? ("Error Occured") : (
        <div>
            <h1>Todo App</h1>
            <input type="text" onChange={(e) => {
                setText(e.target.value);
            }} placeholder="Enter TOdo" />
            <button onClick={handleAddTodo}>Add Todo</button>

            {
                data.map((e) => {
                    console.log(e);
                    return (
                        <>
                        <h2>{e.status}</h2>
                            <Link to={`/todo/${e.id}`} ><div style={{
                                textDecoration: e.status ? "line-through" : "none"
                            }}>{e.tittle}</div></Link> 
                            <div >
                                <button onClick={()=>{handleTogle(e.id, e.status)}}>Toggle</button>
                                <button onClick={()=>{handleDelete(e.id)}}>Delete</button>
                            </div>
                        </>    
                    )
                })
            }
        </div>
    );
}

