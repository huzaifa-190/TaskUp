import { React, useState } from "react";

import { IoIosAddCircle } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

import TaskCard from "./TaskCard";
import TaskInfoModal from "./TaskInfoModal";
import FilterDropDown from "./FilterDropDown";
import Header from "./Header";
import NoInernet from "./NoInernet";
import TasksLoader from "./TasksLoader";

import { useToDoContext } from "../contexts/ToDoContext";

function Home() {
  const { tasks, fetchingData } = useToDoContext();
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilterTag, setCurrentFilterTag] = useState("All");

  // Filtered tasks based on search query
  const filteredTasks = tasks?.filter((task) => {
    if (currentFilterTag?.toLowerCase() == "all") {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (currentFilterTag?.toLowerCase() == "pending") {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.completed
      );
    } else if (currentFilterTag?.toLowerCase() == "done") {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        task.completed
      );
    } else {
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        currentFilterTag?.toLowerCase() == task?.tag?.toLowerCase()
      );
    }
  });
  // task.tagColor == "#11fd0d"
  // );

  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4 px-4 sm:px-10">
      {/* TOP Header  */}
      <Header/>
      {/* -------------------------------------------------------------- Search bar div -------------------------------------------------- */}
      <div className="flex items-center justify-center gap-4 mt-12 sm:mt-10 mb-6 px-4">
        <button className="btn mr-auto ">
          <FilterDropDown
            tagOptions={["Work", "Family", "Personal", "Pending", "Done"]}
            selectedTag={currentFilterTag}
            onTagChange={(value) => setCurrentFilterTag(value)}
          />
        </button>

        <div className="mr-auto flex w-full justify-center items-center gap-4">
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
      {/* <h1 className="text-4xl ">Manage your Life with us</h1> */}
      {/*----------------------------------------------------------------- Tasks Table Div ------------------------------------------------------------ */}
      {fetchingData ? (
        <TasksLoader/>
      ) : !navigator.onLine ? <NoInernet/> : filteredTasks.length == 0 ?
        <h1 className="flex w-full h-72 justify-center items-center text-4xl text-black font-bold  ">
          " No Tasks "
        </h1>
       : (
        <div className="flex flex-col w-full items-center gap-6 p-4 overflow-auto">
          {tasks?.map((task) => (
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
