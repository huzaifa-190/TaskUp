import { React,useState, useEffect } from 'react';
import { getDatabase, ref, set, push, get ,onValue} from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../DataBase/FirebaseConfig';

const db = getDatabase(app);


export default function useFirebaseDatabase () {
  const [tasks, setTasks] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [writingData, setWritingData] = useState(false);
  const [error, setError] = useState(null);

  const writeData = async (task) => {
    try {
      setWritingData(true);
      const newDocRef = push(ref(db, "Tasks"));
      await set(newDocRef, task);
      toast.success("Data set successfully to RealTime DB");
      setWritingData(false);
    } catch (error) {
      setError(error);
      toast.error(`Failed! ${error.message}`);
      setWritingData(false);
    }
  };
  const upDateData = async (task) => {
    try {
      setWritingData(true);
      const newDocRef = push(ref(db, "Tasks"));
      await set(newDocRef, task);
      toast.success("Data set successfully to RealTime DB");
      setWritingData(false);
    } catch (error) {
      setError(error);
      toast.error(`Failed! ${error.message}`);
      setWritingData(false);
    }
  };

   useEffect(()=>{
    const readData = (docName) => {
      try {
        setFetchingData(true);
        const docRef = ref(db, docName);
       
        onValue(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = Object.values(snapshot.val());
            console.log("Data from db in readData inside HOok ==>",data);
            setTasks(data);
            setFetchingData(false);
            // return data;
          } else {
            setError(new Error("No snapshot exists"));
            setFetchingData(false);
            setTasks([])
            // return data
          }}
        )
  
      } catch (error) {
          setError(error);
          toast.error(`Failed! ${error.message}`);
          setFetchingData(false);
          setTasks([])
      }};
      readData("Tasks")
  },[])
 

    return {
        tasks,
        setTasks,
        fetchingData,
        writingData,
        error,
        writeData,
        setTasks: setTasks
        // readData,
    };
};
