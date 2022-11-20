import todoApi from "../../API/todoAPI";
import { useEffect, useState } from "react";
import EditForm from "../EditForm/EditForm";
import "./Todo.css";

const Todo = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [completed, setCompleted] = useState(props.completed);

  useEffect(() => {
    const updatedObj = {
      ...props,
      completed: completed,
    };
    todoApi.updateTodo(updatedObj);
  }, [completed, props]);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  const deleteTodo = () => {
    todoApi.removeTodo(props.id);
  };
  return (
    <div className="todo">
      <button className="deleteBtn" onClick={deleteTodo}>
        X
      </button>
      {isEdit ? (
        <EditForm todo={props} setIsEdit={setIsEdit} />
      ) : (
        <div className="formLabel">
          <p className="title">{props.title}</p>
          <p className="text">{props.description}</p>
          <p className="text">{props.date}</p>
          <div>
            Completed:
            <button className="completedBtn" onClick={toggleCompleted}>
              {completed ? "Yes" : "No"}
            </button>
          </div>
          <button onClick={() => setIsEdit(true)}>edit</button>
        </div>
      )}
    </div>
  );
};
export default Todo;
