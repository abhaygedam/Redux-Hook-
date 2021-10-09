import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, addTodoSucess, addTodoError, addTodoLoading, getTodoSucess, getTodoLoading, getTodoError } from "../redux/action";
import { Todos } from "./Todos";

export const TodoId = () => {
   
    const param = useParams();
    const [todo, setTodo] = useState("");
    const [text, setText] = useState();
  
    console.log(param.id);
    
    useEffect(() => {
        getTodo();
    }, []);

    const getTodo = () => {
        axios.get(`http://localhost:3005/todos/${param.id}`).then((res) => {
            console.log(res.data);
           setTodo(res.data);
        });
    }

    const handleEdit = () => {
        axios.patch(`http://localhost:3005/todos/${param.id}`,
            { tittle: text }
        ).then((res) => {
            
           setTodo(res.data);
        });
    }

    return (
        <div>
            <button ><Link to="/">Home</Link></button>
            <h1>Todo Edit Page</h1>
            <div>
                <p>{todo.tittle}</p>

                <div>
                    <h3>Edit</h3>
                    <input type="text" placeholder="edit todo" onChange={(e) => { setText(e.target.value) }} />
                    <button onClick={handleEdit}>Edit</button>
                </div>
            </div>
        </div>
    );
}

