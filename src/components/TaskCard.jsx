import React from "react";

import { MdEdit ,MdDelete, MdOpacity} from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { PiTagChevronFill } from "react-icons/pi";
import { BiSolidLabel } from "react-icons/bi";

import { useToDoContext } from "../contexts/ToDoContext";



function TaskCard({task}) {

    const { tasks, UpdateTask, RemoveTask, toggleComplete, AddTask } =useToDoContext();

  return (
    <div className={`flex w-full h-16 items-center  bg-lightBg text-black rounded-md shadow-lg `}>
      <div className={`flex items-center gap-3 h-full w-[50%] md:w-[35%] px-4 ${task.completed ? "opacity-50" : "opacity-100"} `}>
      
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompletedCheckBox"
          checked={task.completed}
          onChange={()=>toggleComplete(task.id)}
          className=" text-lightPurp h-8"
          size={28}
        />
        <span>{task.id}</span>
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">{task.title}</span>
      </div>

      <div className="flex items-center justify-end gap-5 h-full w-[65%] px-4 ">
        {/* <span>{task.completed? "Completed" :'To be done'}</span> */}

        <button
        //   onClick={() => RemoveTask(task.id)}
          className="btn"
          title="remove"
        >
          <PiTagChevronFill size={30} color="green" />
          {/* <BiSolidLabel size={30} color="green" /> */}
        </button>

        <button
          onClick={() => RemoveTask(task.id)}
          className="btn"
          title="remove"
        >
          <MdDelete size={24} color="#4C48B8" />
        </button>

        <button
          className="btn hover:-translate-y-1 "
          title="Edit"
        >
          <MdEdit size={24} color="#4C48B8" />
        </button>
        <button className="btn" title="Info">
          <SlOptionsVertical size={24} color="#262626" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
