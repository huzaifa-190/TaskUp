import { React, useState } from "react";

import { MdEdit, MdDelete, MdOpacity } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { PiTagChevronFill } from "react-icons/pi";
import { BiSolidLabel } from "react-icons/bi";

import { useToDoContext } from "../contexts/ToDoContext";
import TaskInfoModal from "./TaskInfoModal";

function TaskCard({ task }) {
  // const apiKey = 
  const { tasks, UpdateTask, RemoveTask, toggleComplete, AddTask } =
    useToDoContext();
  const [viewTaskModalVisible, setViewTaskModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const timee = new Date(2024, 7, 16);
  return (
    <div
      className={`flex w-full h-16 items-center text-black rounded-md shadow-lg bg-slate-100 
          `}
    >
      <div
        className={`flex items-center gap-3 h-full w-[50%] md:w-[45%] px-4 ${
          task.completed ? "completedTask" : " bg-slate-100 "
        } `}
      >
        <input
          type="checkbox"
          name="isCompleted"
          id="isCompletedCheckBox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className={`text-lightPurp h-8 `}
          size={28}
        />
        {/* <span>{task.id}</span> */}
        {/* <span className="textEllipsis">{new Date().toDateString()}</span> */}
        <span>{import.meta.env.VITE_FIREBASE_PROJECT_ID}</span>

        <span className={`textEllipsis text-sm sm:text-md  ${task.completed ? "opacity-80" : " bg-slate-100 "}  `}>{task.title}</span>
      </div>

      <div
        className={`flex items-center justify-end gap-5 h-full w-[55%] px-4 ${
          task.completed ? "completedTask" : " bg-slate-100 "
        } `}
      >
        {/* <span>{task.completed? "Completed" :'To be done'}</span> */}

        <button
          onClick={() => RemoveTask(task.id)}
          className={`btn `}
          title="remove"
        >
          
          <MdDelete size={24} color="#8f40c4" />
        </button>

        <button
          className={`btn hover:-translate-y-1 ${
            task.completed ? "cursor-not-allowed " : ""
          } `}
          title="Edit"
          disabled={task.completed}
          onClick={() => setEditTaskModalVisible(true)}
        >
          <MdEdit size={24} color="#8f40c4" />
        </button>
        <button
          className={`btn`}        title="Info"
          onClick={() => setViewTaskModalVisible(true)}
        >
          <SlOptionsVertical size={24} color="#262626" />
        </button>
        <PiTagChevronFill size={30} color={task.tagColor} />
        {/* <button
          //   onClick={() => RemoveTask(task.id)}
          className="btn"
          title="remove"
        >
        </button> */}
        {/* <BiSolidLabel size={30} color="green" /> */}
      </div>

      {/* ---------------------------------------------------------------------------------- EDIT TASK MODAL ----------------------------------------------------------------------- */}
      {editTaskModalVisible ? (
        <div>
          {/* {" "} */}
          <TaskInfoModal
            heading="Edit Task"
            id={task.id}
            titlee={task.title}
            tagg="Work"
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
            tagg={task.tag}
            view="readonly"
            onClose={() => setViewTaskModalVisible(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

export default TaskCard;
