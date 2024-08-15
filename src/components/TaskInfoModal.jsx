import { React, useState } from "react";

import { X } from "lucide-react";

import { ToDoContext,useToDoContext } from "../contexts/ToDoContext";



function TaskInfoModal({ onClose }) {

  const { tasks, UpdateTask, RemoveTask, toggleComplete, AddTask } =useToDoContext();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [tagColor, setTagColor] = useState("#23df20");


  const onAdd = ()=>{
    const task =  {
      id: 6,
      title:title,
      completed: false,
    }

    AddTask(task)
  }

  return (
    <div className="flex items-center justify-center  fixed inset-0 bg-black bg-opacity-40 backdrop:blur-md ">
      <form className="flex flex-col w-[40%] p-8  rounded-3xl bg-white m-20">

        <div className="flex flex-row mb-4 items-center ">
          <h1 className="text-2xl ml-auto font-bold text-gray-800">New Task</h1>
          <button className="btn ml-auto" onClick={onClose}>
            <X color="#6C69DA" size={28} />
          </button>
        </div>

        <label htmlFor="titleField" className="labels">
          Title
        </label>
        <input
          type="text"
          id="titleField"
          placeholder="Use more relative one"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          className="modalInputFields w-full"
        />

        <label htmlFor="tagField" className="labels">
          Tag input
        </label>
        <input
          type="text"
          id="tagField"
          placeholder="work, study, family etc"
          value={tag}
          required
          onChange={(e) => setTag(e.target.value)}
          className="modalInputFields"
        />

        <label htmlFor="tagColor" className="labels">
          Select tag color{" "}
        </label>
        <input type="color" id="tagColor" value={tagColor} onChange={(e)=>setTagColor(e.target.value)} />
        <h1>{tagColor}</h1>

        <button className="btn w-72 p-4 mt-2 bg-lightPurp rounded-md mx-auto text-white bg-opacity-65" 
        onClick={()=>onAdd()}>
          ADD
        </button>
      </form>
    </div>
  );
}
export default TaskInfoModal;
