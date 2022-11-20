import React, { useState } from "react";
import CreateTodoForm from "./components/CreateTodoForm/CreateTodoForm";
import Modal from "./components/Modal/Modal";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

function App() {
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const onClose = () => {
    setIsOpenCreate(false);    
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <button className="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpenCreate(true);
        }}
      >
        Add todo
      </button>
      <TodoList />
      <Modal onClose={onClose} open={isOpenCreate}>
            <CreateTodoForm onClose={onClose} />
          </Modal>
    </div>
  );
}

export default App;
