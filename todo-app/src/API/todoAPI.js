import database from "../firebase";
import { ref, set, push, onValue, update } from "firebase/database";

const todoApi = {
  todoListRef: ref(database, "todos"),

  addTodo(todo) {
    const newTodoRef = push(this.todoListRef);
    set(newTodoRef, todo);
  },

  getTodos(callback) {    
    onValue(this.todoListRef, (snapshot) => {
      callback([]);
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const data = childSnapshot.val();
        callback((oldArray) => [...oldArray, { id: childKey, ...data }]);
      });
    });
  },
  updateTodo(todo) {
    const updates = {};
    updates[todo.id] = todo;
    update(this.todoListRef, updates);
  },
  removeTodo(id) {
    const updates = {};
    updates[id] = null;
    update(this.todoListRef, updates);
  },
};
export default todoApi;
