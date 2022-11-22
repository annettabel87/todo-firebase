import { database, storage } from "../firebase";
import { ref, set, push, onValue, update } from "firebase/database";
import { ref as refSrorage, deleteObject } from "firebase/storage";

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
  removeTodo(id, fileId) {
    this.deleteFile(fileId);
    const updates = {};
    updates[id] = null;
    update(this.todoListRef, updates);
  },

  deleteFile(id) {
    const storageRef = refSrorage(storage, `files/${id}`);
    deleteObject(storageRef);
  },
};
export default todoApi;
