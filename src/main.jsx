import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components Imports
import LayOut from "./components/Layout/LayOut.jsx";
import Index from "./components/Index.jsx";
import SignIn from "./components/Auth/SignIn.jsx";
import SignUp from "./components/Auth/SignUp.jsx";
import Home from "./components/Home.jsx";
import AuthProtectedRoute from "./components/Auth/AuthProtectedRoute.jsx";
import HomeProtectedRoute from "./components/Home/HomeProtectedRoute.jsx";
import { ToDoProvider } from "./contexts/ToDoContext";
import useFireStore from "./Hooks/useFireStore";

// Setting Routes for Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayOut />}>
        <Route
          index
          element={
            <HomeProtectedRoute>
              <Index />
            </HomeProtectedRoute>
          }
        />
        <Route
          path="sign-up"
          element={
            <HomeProtectedRoute>
              <SignUp />
            </HomeProtectedRoute>
          }
        />
        <Route
          path="sign-in"
          element={
            <HomeProtectedRoute>
              <SignIn />
            </HomeProtectedRoute>
          }
        />
        <Route
          path="home"
          element={
            <AuthProtectedRoute>
              {/* Wrap only the Home route with ToDoProvider */}
              <ToDoWrapper>
                <Home />
              </ToDoWrapper>
            </AuthProtectedRoute>
          }
        />
      </Route>
    </>
  )
);

// Helper component to wrap Home route with ToDoProvider
function ToDoWrapper({ children }) {
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

  const RemoveTask = (id, docName) => {
    deleteDoc(id, docName);
  };

  const UpdateTask = ({id, docName, task}) => {
    upDateDoc(id, docName, task);
    console.log("In update task afteer .... ")
    toast.success("Task Updated!", { autoClose: 1000 });
  };

  const toggleComplete = ({id, docName, task}) => {
    const toggledTask = { ...task, completed: !task.completed };
    toggleCompleted(id, docName, toggledTask);
  };

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
      {children}
    </ToDoProvider>
  );
}

// Render Main
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);

function Main() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
