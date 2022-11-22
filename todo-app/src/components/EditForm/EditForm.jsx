import { useState } from "react";
import todoApi from "../../API/todoAPI";
import "./EditForm.css";

const EditForm = ({ todo, setIsEdit }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(todo.date);

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateTodo = {
      id: todo.id,
      title,
      description,
      date,
      completed: todo.completed,
    };
    todoApi.updateTodo(updateTodo);
    setIsEdit(false);
  };
  const chancelEdit = () => {
    setIsEdit(false);
  };
  const handlerChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handlerChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handlerChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <form className="formEdit" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="title">
          <input
            type="text"
            required
            id="title"
            name="title"
            value={title}
            onChange={handlerChangeTitle}
          ></input>
        </label>
        <label htmlFor="description">
          <input
            type="text"
            required
            id="description"
            name="description"
            value={description}
            onChange={handlerChangeDescription}
          ></input>
        </label>
        <label htmlFor="date">
        Deadline: 
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handlerChangeDate}
          ></input>
        </label>
        <div className="btnWrapper">
          <button type="submit">Edit</button>
          <button onClick={chancelEdit}>chanel</button>
        </div>
      </form>
    </div>
  );
};
export default EditForm;
