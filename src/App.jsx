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

// ------------------------------------------------------------------------- MAIN FUNCTION -----------------------------------------------------------------
function App() {
  // Getting methods and data from useFirebaseDatabase Custom Hook
  const {
    upDateDoc,
    deleteDoc,
    toggleCompleted,
    writeData,
    tasks,
    setTasks,
    fetchingData,
    writingData,
  } = useFirebaseDatabase();

  // ------------------------------------------------------------------------- METHODS FOR CONTEXT -------------------------------------------------------------
  const AddTask = async (task) => {
    await writeData(task);
  };

  const RemoveTask = ({ id, docName }) => {
    deleteDoc(id, docName);
  };

  const UpdateTask = ({ id, docName, task }) => {
    upDateDoc(id, docName, task);
    toast.success("Task Updated !",{autoClose:1000});

  };

  const toggleComplete = ({ id, docName, task }) => {
    const toggledTask = { ...task, completed: !task.completed };
    // console.log("This is the toggled task that will be updated on check/uncheck", toggledTask);
    toggleCompleted(id, docName, toggledTask);
    // toast.success("Task Updated ",{autoClose:1000});

  };

  // ------------------------------------------------------------------------- RETURN -------------------------------------------------------------
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
      <Home />
      <ToastContainer />
      {/* <SignUp /> */}
    </ToDoProvider>
  );
}

export default App;
