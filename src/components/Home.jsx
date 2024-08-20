import { React, useState } from "react";

import { IoIosAddCircle } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";


import TaskCard from "./TaskCard";
import TaskInfoModal from "./TaskInfoModal";
import FilterDropDown from "./FilterDropDown";
import Header from "./Header";
import NoInernet from "./NoInernet";
import TasksLoader from "./TasksLoader";
import useAuth from "../Hooks/useAuth";

import { useToDoContext } from "../contexts/ToDoContext";

function Home() {
  const { tasks, fetchingData } = useToDoContext();
  const {currentUser} = useAuth()
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilterTag, setCurrentFilterTag] = useState("All");

  // Filtered tasks based on search query
  const filteredTasks = tasks?.filter((task) => {
    if (currentFilterTag?.toLowerCase() == "all") {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (currentFilterTag?.toLowerCase() == "pending") {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) && !task.completed
      );
    } else if (currentFilterTag?.toLowerCase() == "done") {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) && task.completed
      );
    } else {
      console.log("Filtering Tasks ...",task)
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) && currentFilterTag?.toLowerCase() == task?.tag?.toLowerCase()
      );
    }
  });
  // task.tagColor == "#11fd0d"
  // );

  return (
    <div className="flex-col h-screen w-screen items-center justify-center px-2 sm:px-10 ">
        
      {/* -------------------------------------------------------------- Search bar div -------------------------------------------------- */}
      <div className="flex items-start justify-center gap-4 mt-5 sm:mt-10 mb-6 px-4">
        {/* FILTER DROPDOWN FOR >= LG-Screen SIZES*/}
        <button className="btn mr-auto hidden sm:flex">
          <FilterDropDown
            tagOptions={["Work", "Family", "Personal", "Pending", "Done"]}
            selectedTag={currentFilterTag}
            onTagChange={(value) => setCurrentFilterTag(value)}
          />
        </button>

        <div className="sm:mr-auto flex w-full justify-center items-center gap-4">
          <input
            type="text"
            id="searchField"
            placeholder="search for tasks ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="searchField mr-auo"
          />

          <button
            title="Add new task"
            onClick={() => setAddTaskModalVisible(true)}
            className="btn "
          >
            <IoIosAddCircle size={45} color="#8f40c4" />
          </button>
        </div>
      </div>

      {/*----------------------------------------------------------------- FILTER DROP-DOWN Div FOR SM-Screen SIZES------------------------------------------------------------ */}
      <button className="btn flex sm:hidden px-4">
        <FilterDropDown
          tagOptions={["Work", "Family", "Personal", "Pending", "Done"]}
          selectedTag={currentFilterTag}
          onTagChange={(value) => setCurrentFilterTag(value)}
        />
      </button>
      {/*----------------------------------------------------------------- Tasks Table Div ------------------------------------------------------------ */}
      {fetchingData ? (
        <TasksLoader />
      ) : !navigator.onLine ? (
        <NoInernet />
      ) : filteredTasks.length == 0 ? (
        <h1 className="flex w-full h-72 justify-center items-center text-2xl sm:text-4xl text-black font-bold  ">
          " No such tasks  "
        </h1>
      ) : (
        <div className="flex flex-col w-full items-center gap-6 p-4  ">
          {filteredTasks?.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}


      {/*----------------------------------------------------------------- Botton LEFT-RIGHT Buttons Div ------------------------------------------------------------ */}
          {/* <div className=" flex w-full h-40 sm:h-20 items-center justify-evenly">
            <button title="prev" className="btn">
              <FaChevronLeft size={28} />
            </button>

            <button title="next" className="btn">
              <FaChevronRight size={28} />
            </button>
          </div> */}
        </div>
      )}

      {addTaskModalVisible ? (
        <div>
          <TaskInfoModal
            heading="Create Task"
            view="create"
            onClose={() => setAddTaskModalVisible(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Home;
