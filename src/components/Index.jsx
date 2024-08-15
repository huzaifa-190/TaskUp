import React from "react";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import { useToDoContext } from "../contexts/ToDoContext";
import { colors } from "../constants/Colors";

function Index() {
  const { tasks ,UpdateTask,RemoveTask,toggleComplete,AddTask} = useToDoContext();

  const TaskCard = (task) => {
    return (
      <div className="flex w-full h-16 items-center  bg-lightBg text-black    rounded-md shadow-lg ">
        <div className="flex items-center gap-3 h-full w-[35%] px-4   ">
          <input
            type="checkbox"
            name="isCompleted"
            id="isCompleted"
            className=" text-lightPurp h-8"
            size={28}
          />
          <span>{task.id}</span>
          <span>{task.title}</span>
        </div>

        <div className="flex items-center justify-end gap-5 h-full w-[65%] px-4 ">
          {/* <span>{task.completed? "Completed" :'To be done'}</span> */}
          <button onClick={()=>RemoveTask(task.id)} className="active:opacity-45" title="remove">
            <MdDelete size={24} color="#4C48B8" />
          </button>
          <button className="active:opacity-45 hover:-translate-y-1 transition-all " title="Edit">
            <MdEdit size={24} color="#4C48B8" />
          </button>
          <button className="active:opacity-45" title="Info">
            <SlOptionsVertical size={24} color="#262626" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10">
      {/* TOP Header  */}
      <div className="flex h-24 w-ful px-4">
        {/* Left Div in Header containing Logo */}
        <button className="flex items-center gap-1" onClick={()=> location.reload()}>
          <h1 className="flex items-center justify-center h-12 w-12 p-4 rounded-full text-white bg-lightPurp text-2xl font-bold">
            To
          </h1>
          <h1 className="text-xl font-bold">Do</h1>
        </button>

        {/* Right Div in Header containing email and avatar */}
        <div className="flex ml-auto items-center justify-end px-4 gap-5 sm:gap-8">
          <h2 className="text-xl text-black">huzaifa190@gmail.com</h2>
          <button>
            <MdDarkMode size={28} title="dark mode" />
          </button>
          {/* <MdOutlineLightMode size={28} title="light mode" /> */}
        </div>
      </div>

      {/* Search bar div */}
      <div className="flex items-center justify-center gap-4 mt-12 sm:mt-10 mb-6 w-full ">
        <input
          type="text"
          placeholder="search for tasks ..."
          className="h-10  w-72 sm:w-[350px] bg-white border-2 border-lightPurp p-2 rounded-md active: outline-2 active: outline-lightPurp"
        />

        <button title="Add new task">
          <IoIosAddCircle size={40} color="#6C69DA" />
        </button>
      </div>

      {/* <h1 className="text-4xl ">Manage your Life with us</h1> */}
      {/* Tasks Table Div */}
      <div className="flex flex-col w-full items-center gap-6 p-4 overflow-auto">
        {tasks.map((task) => TaskCard(task))}
        <div className=" flex w-full h-40 sm:h-20 items-center justify-evenly">
          <button title="prev">
            <FaChevronLeft size={28} />
          </button>

          <button title="next">
            <FaChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
