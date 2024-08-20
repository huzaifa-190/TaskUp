// import { useEffect, useState } from "react";
// import "./App.css";
// import SignUp from "./components/Auth/SignUp";
// import SignIn from "./components/Auth/SignIn";
// import Index from "./components/Index";
// import { ToastContainer, toast } from "react-toastify";

// import { getDatabase, ref, set, push, get, onValue } from "firebase/database";
// import app from "./DataBase/FirebaseConfig";

// const db = getDatabase(app);

// import { ToDoProvider, useToDoContext } from "./contexts/ToDoContext";
// import useFireStore from "./Hooks/useFireStore";

// // ------------------------------------------------------------------------- MAIN FUNCTION -----------------------------------------------------------------
// function App() {
//   // Getting methods and data from useFirebaseDatabase Custom Hook
//   const {
//     upDateDoc,
//     deleteDoc,
//     toggleCompleted,
//     writeData,
//     tasks,
//     setTasks,
//     fetchingData,
//     writingData,
//   } = useFireStore();

//   // ------------------------------------------------------------------------- METHODS FOR CONTEXT -------------------------------------------------------------
//   const AddTask = async (task) => {
//     await writeData(task);
//   };

//   const RemoveTask = ({ id, docName }) => {
//     deleteDoc(id, docName);
//   };

//   const UpdateTask = ({ id, docName, task }) => {
//     upDateDoc(id, docName, task);
//     toast.success("Task Updated !",{autoClose:1000});

//   };

//   const toggleComplete = ({ id, docName, task }) => {
//     const toggledTask = { ...task, completed: !task.completed };
//     // console.log("This is the toggled task that will be updated on check/uncheck", toggledTask);
//     toggleCompleted(id, docName, toggledTask);
//     // toast.success("Task Updated ",{autoClose:1000});

//   };

//   // ------------------------------------------------------------------------- RETURN -------------------------------------------------------------
//   return (
//     <ToDoProvider
//       value={{
//         tasks,
//         setTasks,
//         AddTask,
//         UpdateTask,
//         RemoveTask,
//         toggleComplete,
//         fetchingData,
//         writingData,
//       }}
//     >
//       {/* <Home /> */}
//       <SignUp />
//       <SignIn />

//       <ToastContainer />
//     </ToDoProvider>
//   );
// }

// export default App;
