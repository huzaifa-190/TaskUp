import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

// ---------------------------------------------------- Components Imports ------------------------------------------
import LayOut from "./components/Layout/LayOut.jsx";
import Index from "./components/Index.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import Home from "./components/Home.jsx";
import Auth from "./components/Auth/Auth.jsx";
import { ToDoProvider } from "./contexts/ToDoContext";
import useFireStore from "./Hooks/useFireStore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayOut />}>
        <Route path="" element={<Index />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="home" element={<Auth><Home /></Auth>} />
        {/* <Route path="home" element={<Home />} /> */}
      </Route>
    </>
  )
);

function Main() {
  const {
    upDateDoc,
    deleteDoc,
    toggleCompleted,
    writeData,
    tasks,
    setTasks,
    fetchingData,
    writingData,
  } = useFireStore();

  const AddTask = async (task) => {
    await writeData(task);
  };

  const RemoveTask = ({ id, docName }) => {
    deleteDoc(id, docName);
  };

  const UpdateTask = ({ id, docName, task }) => {
    upDateDoc(id, docName, task);
    toast.success("Task Updated!", { autoClose: 1000 });
  };

  const toggleComplete = ({ id, docName, task }) => {
    const toggledTask = { ...task, completed: !task.completed };
    toggleCompleted(id, docName, toggledTask);
  };

  return (
    // ------------------------------------------------------ Wraping entire Router with ToDo Providers ----------------------------------------
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
      <RouterProvider router={router} />
      <ToastContainer />
    </ToDoProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
