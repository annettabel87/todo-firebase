import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD833gE9Wjglf9ly5zD5KxQbsbEWQ2Y78M",
  authDomain: "todo-app-74f73.firebaseapp.com",
  databaseURL: "https://todo-app-74f73-default-rtdb.firebaseio.com",
  projectId: "todo-app-74f73",
  storageBucket: "todo-app-74f73.appspot.com",
  messagingSenderId: "911799866353",
  appId: "1:911799866353:web:8a270d3bb6a51e4fb2ea50"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
export {database, storage};
