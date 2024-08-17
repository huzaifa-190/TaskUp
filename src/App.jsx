import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import TaskInfoModal from "./components/TaskInfoModal";
import { ToastContainer, toast } from "react-toastify";

import { getDatabase, ref, set, push, get, onValue } from "firebase/database";
import app from "./DataBase/FirebaseConfig";

const db = getDatabase(app);

import { ToDoProvider, useToDoContext } from "./contexts/ToDoContext";
import useFirebaseDatabase from "./Hooks/FirebaseHooks";

function App() {
  const { upDateDoc,deleteDoc, writeData, tasks, setTasks, fetchingData, writingData } =
    useFirebaseDatabase();

  const AddTask = async (task) => {
    // setTasks((prev) => [{ id: Date.now, ...task }, ...prev]);
    await writeData(task);
    // toast("Task added successfully !", { autoClose: 1500 });
  };

  const RemoveTask = ({id,docName}) => {
    console.log("Removing task ...");
    // setTasks((prev) => prev.filter((prevTask) => prevTask.id !== id));
    deleteDoc(id,docName)
  };

  const UpdateTask = ({ id, docName, task }) => {
    // setTasks((prev) =>
    //   prev.map((prevTask) => (prevTask.id === id ? task : prevTask))
    // );
    upDateDoc(id, docName, task);
  };
  const toggleComplete = (id) => {
    // setTasks((prev)=> prev.map(prevTask => prevTask.id === id ? prevTask.completed=!prevTask.completed : prevTask))

    setTasks((prev) =>
      prev.map((prevTask) =>
        prevTask.id === id
          ? { ...prevTask, completed: !prevTask.completed }
          : prevTask
      )
    );
  };

  useEffect(() => {}, []);

  useEffect(() => {
    // localStorage.setItem("toDos", JSON.stringify(tasks));
  }, []);

  return (
    <ToDoProvider
      value={{
        tasks,
        setTasks,
        AddTask,
        UpdateTask,
        RemoveTask,
        toggleComplete,
        fetchingData,
        writingData,
      }}
    >
      {/* <TaskInfoModal /> */}
      <Home />
      <ToastContainer />
      {/* <SignUp /> */}
    </ToDoProvider>
  );
}

export default App;
