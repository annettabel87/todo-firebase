import {database, storage} from "../firebase";
import { ref, set, push, onValue, update } from "firebase/database";
import { ref as refSrorage, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

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
        callback((oldArray) => [...oldArray, { key: childKey, ...data }]);
      });
    });
  },
  updateTodo(todo) {
    const updates = {};
    updates[todo.id] = todo;
    update(this.todoListRef, updates);
  },
  removeTodo(id) {
    this.deleteFile(id)
    const updates = {};
    updates[id] = null;
    update(this.todoListRef, updates);
    
  },
  addFile(id, file, callback) {
    if (file == null) return;
    const storageRef = refSrorage(storage, `files/${id}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        callback( url)
      })
    })
  },
   deleteFile(id) {
    const storageRef = refSrorage(storage, `files/${id}`);
    deleteObject(storageRef).then(() => {
      console.log("File deleted successfully")
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
   }
};
export default todoApi;
