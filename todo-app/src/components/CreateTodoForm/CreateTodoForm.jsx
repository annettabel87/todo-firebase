
import { useEffect } from "react";
import { useState } from "react";
import todoApi from "../../API/todoAPI";
import "./CreateTodoForm.css";

const CreateTodoForm = ({onClose}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loadingFile, setLoadingFile] = useState(null);
  
  const clearForm =() => {
    setTitle("");
    setDescription("");
    setDate("");
  }
  const onSubmit = async (e) => {
    e.preventDefault();
        
    const todo = {      
      title,
      description,
      date,
      completed: false,
      file: fileUrl
    };

    todoApi.addTodo(todo);
    clearForm();
    onClose();
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
  const handlerChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const uploadFile = (e) => {    
    e.preventDefault();
    const id  = Date.now().toString();
    todoApi.addFile(id, file, setFileUrl)
    setLoadingFile("loading...")
  }
  useEffect(() => {
    fileUrl ? setLoadingFile("load") : setLoadingFile("")
  }, [fileUrl, setFileUrl])
  return (
    <div className="overlay" onClick={onClose}>
       <div className="todoFormWrapper"       
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
         <button className="close"  onClick={onClose}>
          X
        </button>
      <form className="createForm" onSubmit={(e) => onSubmit(e)}>
        <label className="formLabel" htmlFor="title"><div className="inputTitle">Title: </div>
          <input
            type="text"
            placeholder="title"
            required
            id="title"
            name="title"
            value={title}
            onChange={handlerChangeTitle}
          ></input>
        </label>
        <label className="formLabel" htmlFor="description"><div className="inputTitle">Description:</div> 
          <input
            type="text"
            placeholder="description"
            required
            id="description"
            name="description"
            value={description}
            onChange={handlerChangeDescription}
          ></input>
        </label>
        <label className="formLabel" htmlFor="date"><div className="inputTitle">Date: </div>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handlerChangeDate}
          ></input>
        </label>
        <label className="formLabel" htmlFor="file"><div className="inputTitle">Date: </div>
          <input
            type="file"
            id="file"
            name="file"            
            onChange={handlerChangeFile}
          ></input>
          <div>{loadingFile}</div>
        </label>       
        <button onClick={uploadFile}>Add file</button>
        <button type="submit">Add</button>
      </form>
      </div>
    </div>
  );
};
export default CreateTodoForm;
