import { useEffect, useState } from "react";
import todoApi from "../../API/todoAPI";
import "./TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    todoApi.getTodos(setTodos);
  }, []);
  return (
    <div className="todoList">
      {todos.length !== 0 ? (
        todos.map((todo) => <div key={todo.id} >{todo.title}</div>)
      ) : (
        <div>no todos</div>
      )}
    </div>
  );
};
export default TodoList;
