import { useState, useEffect } from "react";
import todoApi from "../../API/todoAPI";
import EditForm from "../EditForm/EditForm";
import AddFile from "../AddFile/AddFile";
import { checkDeadline } from "../../utils/dateUtils";
import "./Todo.css";

const Todo = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deadline, setDeadline] = useState(false);

  const toggleCompleted = () => {
    todoApi.updateTodo({ ...props, completed: !props.completed });
  };

  const deleteTodo = () => {
    todoApi.removeTodo(props.id, props.file.id).catch((error) => {
      console.log(error)
    });
  };
  const addFile = (id, url) => {
    const newTodo = { ...props, file: { id, url } };
    todoApi.updateTodo(newTodo);
  };
 
  useEffect(() => {
    setDeadline(checkDeadline(props.date));
  }, [props.date]);

  return (
    <div className="todo">
      {!isEdit && (
        <button className="deleteBtn" onClick={deleteTodo}>
          X
        </button>
      )}

      {isEdit ? (
        <EditForm todo={props} setIsEdit={setIsEdit} />
      ) : (
        <div className="formLabel">
          <p className="title">{props.title}</p>
          <p className="text">{props.description}</p>
          <p className={`text ${deadline && "wrang"}`}>Deadline: {props.date}</p>
          <div>
            Completed:
            <button className="todoBtn" onClick={toggleCompleted}>
              {props.completed ? <span>&#10004;</span> : <span >&#10060;</span>}
            </button>
          </div>
          {props.file ? (
            <a
              className="dwnBtn"
              href={props.file.url}
              download="true"
              target="_blank"
              rel="noreferrer"
            >
              download file
            </a>
          ) : (
            <AddFile callback={addFile} />
          )}
          <button className="todoBtn" onClick={() => setIsEdit(true)}>
            edit
          </button>
        </div>
      )}
    </div>
  );
};
export default Todo;
