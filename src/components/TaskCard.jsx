import { React, useState } from "react";

import { MdEdit, MdDelete, MdOpacity } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { PiTagChevronFill } from "react-icons/pi";
import { BiSolidLabel } from "react-icons/bi";

import { useToDoContext } from "../contexts/ToDoContext";
import TaskInfoModal from "./TaskInfoModal";

function TaskCard({ task }) {
  const { tasks, UpdateTask, RemoveTask, toggleComplete, AddTask } =
    useToDoContext();
  const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);

  return (
    <div
      className={`flex w-full h-16 items-center bg-slate-100  text-black rounded-md shadow-lg `}
    >
      <div
        className={`flex items-center gap-3 h-full w-[50%] md:w-[35%] px-4 ${
          task.completed ? "opacity-50 line-through " : "opacity-100"
        } `}
      >
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompletedCheckBox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className=" text-lightPurp h-8"
          size={28}
        />
        {/* <span>{task.id}</span> */}
        <span className="textEllipsis">{task.title}</span>
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

        <button className="btn hover:-translate-y-1 " title="Edit" onClick={()=>setEditTaskModalVisible(true)}>
          <MdEdit size={24} color="#4C48B8" />
        </button>
        <button
          className="btn"
          title="Info"
          onClick={() => setViewTaskModalVisible(true)}
        >
          <SlOptionsVertical size={24} color="#262626" />
        </button>
      </div>

    {/* ---------------------------------------------------------------------------------- EDIT TASK MODAL ----------------------------------------------------------------------- */}
      {editTaskModalVisible ? (
          <div>
          {/* {" "} */}
          <TaskInfoModal
            heading="Edit Task"
            id={task.id}
            titlee={task.title}
            tagg='Work'
            view="editable"
            onClose={() => setEditTaskModalVisible(false)}
            />
        </div>
      ) : null}

      {/* ---------------------------------------------------------------------------------- VIEW TASK MODAL ----------------------------------------------------------------------- */}
      {viewTaskModalVisible ? (
        <div>
          {/* {" "} */}
          <TaskInfoModal
            heading="Task Info"
            id={Date.now}
            titlee={task.title}
            view="readonly"
            onClose={() => setViewTaskModalVisible(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;
