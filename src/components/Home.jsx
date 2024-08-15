import {React,useState} from "react";

import { IoIosAddCircle } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";

import TaskCard from "./TaskCard";
import TaskInfoModal from "./TaskInfoModal";

import { useToDoContext } from "../contexts/ToDoContext";

function Home() {

  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false)
  const { tasks } = useToDoContext();
  const [searchQuery, setSearchQuery] = useState("");

   // Filtered tasks based on search query
   const filteredTasks = tasks.filter((task) =>
     task.title.toLowerCase().includes(searchQuery.toLowerCase())
   );
  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10">
      {/* TOP Header  */}
      <div className="flex h-24 w-ful px-4">
        {/* Left Div in Header containing Logo */}
        <button
          className="flex items-center gap-1 btn"
          onClick={() => location.reload()}
        >
          <h1 className="flex items-center justify-center h-12 w-12 p-4 rounded-full text-white bg-lightPurp text-2xl font-bold">
            To
          </h1>
          <h1 className="text-xl font-bold">Do</h1>
        </button>

        {/* Right Div in Header containing email and avatar */}
        <div className="flex ml-auto items-center justify-end px-4 gap-5 sm:gap-8">
          <h2 className="text-xl text-black">huzaifa190@gmail.com</h2>
          <button className="btn">
            <MdDarkMode size={28} title="dark mode" />
          </button>
          {/* <MdOutlineLightMode size={28} title="light mode" /> */}
        </div>
      </div>

      {/* Search bar div */}
      <div className="flex items-center justify-center gap-4 mt-12 sm:mt-10 mb-6 w-full ">
        <input
          type="text"
          id="searchField"
          placeholder="search for tasks ..."
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          className="searchField"
        />

        <button title="Add new task" onClick={()=>setAddTaskModalVisible(true)} className="btn">
          <IoIosAddCircle size={40} color="#6C69DA" />
        </button>
      </div>

      {/* <h1 className="text-4xl ">Manage your Life with us</h1> */}

      {/* Tasks Table Div */}
      <div className="flex flex-col w-full items-center gap-6 p-4 overflow-auto">
        {filteredTasks?.map((task) => (
          <TaskCard task={task} />
        ))}


        <div className=" flex w-full h-40 sm:h-20 items-center justify-evenly">
          <button title="prev" className="btn">
            <FaChevronLeft size={28} />
          </button>

          <button title="next" className="btn">
            <FaChevronRight size={28} />
          </button>
        </div>
      </div>

        {addTaskModalVisible ? <div> <TaskInfoModal onClose={()=>setAddTaskModalVisible(false)}/></div> : null }
    </div>
  );
}

export default Home;
