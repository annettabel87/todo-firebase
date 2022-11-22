import { useEffect, useState } from "react";
import todoApi from "../../API/todoAPI";
import Todo from "../Todo/Todo";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    todoApi.getTodos(setTodos);
  }, []);
  
  return (
    <div className="todoList">
      {todos.length !== 0 ? (
        todos.map((todo) => <Todo key={todo.id} {...todo} />)
      ) : (
        <div>no todos</div>
      )}
    </div>
  );
};
export default TodoList;
