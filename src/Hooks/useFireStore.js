import { React,useState, useEffect } from 'react';
import { getDatabase, ref, set, push, get ,onValue,remove} from 'firebase/database';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../DataBase/FirebaseConfig';
import useAuth from './useAuth';
const db = getDatabase(app);


export default function useFireStore () {
  const [tasks, setTasks] = useState([]);
  const {currentUser} = useAuth();
  const [fetchingData, setFetchingData] = useState(false);
  const [writingData, setWritingData] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const [error, setError] = useState(null);
  
  // ---------------------------------------------------------------- WRITE DOC METHOD ----------------------------------------------------------------
  const writeData = async (task) => {
    try {
      setWritingData(true);
      // const newDocRef = push(ref(db, "Tasks/"+currentUser?.uid));
      // const newDocRef = push(ref(db, "Tasks/"));
      // Reference to the user's tasks root
      const newDocRef = ref(db, `Tasks/${currentUser?.uid}`);
      const newTaskRef = push(newDocRef); // Generates a unique key for the new task
      await set(newTaskRef, task);
      setWritingData(false);
    } catch (error) {
      setError(error);
      toast.error(`Failed! ${error.message}`);
      setWritingData(false);
    }
  };
  
  // ---------------------------------------------------------------- DELETE DOC METHOD ----------------------------------------------------------------
  const deleteDoc = async (id,docName)=>{
    try {
      setWritingData(true);
      const docRef =(ref(db,docName+'/'+currentUser.uid+'/'+id));
      await remove(docRef)
      toast.success("Task deleted Successfully",{autoClose:1000});
      setWritingData(false);
    } catch (error) {
      setError(error);
      toast.error(`Failed! ${error.message}`);
      setWritingData(false);
    }
  }
  // ---------------------------------------------------------------- UPDATE DOC METHOD ----------------------------------------------------------------
  const upDateDoc  = async (id,docName,task) => {
    try {
      setWritingData(true);
      const newDocRef =(ref(db,docName+'/'+currentUser.uid+'/'+id));
      await set(newDocRef, task);
    } catch (error) {
      setError(error);
      toast.error(`Failed!--> ${error.message}`);
    }
    finally {
      setWritingData(false);
    }
  };
  
  // ---------------------------------------------------------------- TOGGLE COMPLETED METHOD ---------------------------------------------------------------
  const toggleCompleted  = async (id,docName,task) => {
    try {
      setWritingData(true);
      const newDocRef =(ref(db,docName+'/'+id));
      await set(newDocRef, task);
    } catch (error) {
      setError(error);
      toast.error(`Failed! ${error.message}`);
    }
    finally{
      setWritingData(false);
    }
  };



  // ---------------------------------------------------------------- FETCH BY ID ----------------------------------------------------------------
  const fetchTask = async (docName,taskId) => {
    if(!navigator.onLine){
      toast("No Internet",{autoClose:1000})
    }else{
      
      try {
        setUpdatingData(true);
        const docRef = ref(db, docName+'/'+taskId);
        // Fetching that single task from db
        const snapshot = await get(docRef)
        if(snapshot.exists()){
          const prevTask = snapshot.val()
          console.log("This is task fetched for update ==> ",prevTask)
        }
       
      } catch (error) {
          setError(error);
          toast.error(`Failed! ${error.message}`);
          setUpdatingData(false);
          setTasks([])
      }
    };
  }

   
  

  useEffect(()=>{
     // Ensure that currentUser is available before making a request
  if (!currentUser || !currentUser.uid) {
    console.log("User is not authenticated");
    return;
  }
    // ---------------------------------------------------------------- READ METHOD ----------------------------------------------------------------
    const readData = (docName) => {

      try {
        setFetchingData(true);
        // const docRef = ref(db,docName);
        // const docRef = ref(db, docName+'/'+currentUser?.uid+'/');
        const docRef = ref(db,`${docName}/${currentUser.uid}/`);
        
        console.log("Reference path:", docRef.toString());        
         console.log("Inside readData mehtod ");
         onValue(docRef, (snapshot) => {
           if (snapshot.exists()) {
             
             const docs = snapshot.val()
             console.log("snaphot.vals =>  ",docs);
            const docIds = Object.keys(docs);
            const data = docIds.map(id => {return{...docs[id],id:id}})

            console.log("Data from db in readData inside HOok ==>",data);
            setTasks(data);
            setFetchingData(false);
            // return data;
          } else {
            setError(new Error("No snapshot exists"));
            toast.error(`Failed - snapshot does't exist`);
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
      }
    }
    
      

      if(!navigator.onLine){
        toast("No Internet",{autoClose:1000})
      }
      else{
        readData("Tasks")
      }
      
  },[currentUser])
 

    return {
        tasks,
        setTasks,
        fetchingData,
        writingData,
        toggleCompleted,
        error,
        writeData,
        upDateDoc,
        deleteDoc,
        setTasks: setTasks
        // readData,
    };
}
