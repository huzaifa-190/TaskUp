import { React, useState,useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { X } from "lucide-react";

import { useToDoContext } from "../contexts/ToDoContext";

import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loaderCss = {

  // display: "block",
  // margin: "0 auto",
  // borderColor: "",
};

// ---------------------------------------------------------- MAIN FUNCTION ----------------------------------------------------

function TaskInfoModal({ heading='Task',onClose ,id='',titlee='',tagg='',taggColor='',view=''}) {
  const { tasks, UpdateTask, RemoveTask, toggleComplete, AddTask } =
    useToDoContext();

  const [title, setTitle] = useState(`${titlee? titlee : ''}`);
  // const [title, setTitle] = useState(`${id? id : ''}`);
  const [tag, setTag] = useState(`${tagg ? tagg : ''}`);
  const [tagColor, setTagColor] = useState(`${taggColor ? taggColor : '#23df20'}`);
  const [formErrors, setFormErrors] = useState({
    title: false,
    tag: false,
    tagColor: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const bgRef = useRef()

  // ---------------------------------------------------------------- METHODS ----------------------------------------------------------------

  const closeOnBgTap = (e)=>{
    if(bgRef.current == e.target) onClose()

  }
  const handleSubmit = async () => {
    event.preventDefault();
    const newErrors = {
      title: title.trim() === "",
      tag: tag.trim() === "",
      tagColor: tagColor.trim() === "",
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      // Proceed with form submission or your action here
      console.log("Form submitted:", title, "   ", tag, "   ", tagColor);
      setIsLoading(true)
      const task = {
        id: Date.now(),
        tag:tag,
        tagColor:tagColor,
        title: title,
        completed: false,
      };

      AddTask(task);
      setIsLoading(false)
      onClose();
      toast("Task added successfully !",{autoClose:1500});
      
    }
    else{
      setIsLoading(false)
      // toast("Failed !",{autoClose:2000});
      console.log("form errors i.e empty fields -> ", formErrors);
    }
  };
  

  // useEffect(() => {
  //   // class added to the body to disable scrolling
  //   document.body.style.overflow = 'hidden';

  //   // Cleanup function to enable scrolling when modal is closed
  //   return () => {
  //     document.body.style.overflow = 'scroll';
  //   };
  // }, []);

  {/* ----------------------------------------------------- RETURN ------------------------------------------------------  */}
  return (
    <div
      className="flex items-center justify-center  fixed inset-0 bg-black bg-opacity-40 backdrop:blur-md "
      // onClick={onClose}
      onClick={closeOnBgTap}
      ref={bgRef}
    >
      {/* ----------------------------------------------------- FORM ------------------------------------------------------  */}
      <form className="flex flex-col md:w-[40%] 2xl:w-[50%] p-10 sm:p-8  rounded-3xl bg-white m-20 z-10 "
        // onSubmit={handleSubmit()}
      >
        <div className="flex flex-row mb-4 items-center ">
          <h1 className="text-2xl ml-auto font-bold text-gray-800">{heading}</h1>
          <button className="btn ml-auto" onClick={onClose}>
            <X color="red" size={28} />
          </button>
        </div>

        {/* ----------------------------------------------------- TITLE FIELD ------------------------------------------------------  */}
        <label htmlFor="titleField" className="labels">
          Title *
        </label>
        <input
          readOnly={view=='readonly'}
          autoFocus={view!='readonly'}
          title={view}
          type="text"
          id="titleField"
          placeholder="Use a relative title for your task"
          value={title}
          required
          onChange={(e) => {
            setTitle(e.target.value);
            setFormErrors({
              ...formErrors,
              title: false,
            });
          }}
          className={`modalInputFields focus w-full textEllipsis 
            ${formErrors.title ? " requiredField " : ""}`}
        />
        {formErrors.title && <h1 className="requiredFieldLabel">Field Required</h1>}

        {/* ----------------------------------------------------- TAG FIELD -------------------------------------------------------------  */}
        <label htmlFor="tagField" className="labels">
          Tag *
        </label>
        <input
          readOnly={view=='readonly'}
          title={view}
          type="text"
          id="tagField"
          placeholder="work, study, home etc"
          value={tag}
          required
          onChange={(e) => {
            setTag(e.target.value);
            setFormErrors({
              ...formErrors,
              tag: false,
            });
          }}
          className={`modalInputFields ${
            formErrors.tag ? "requiredField" : ""
          }`}
        />
        {formErrors.tag && <h1 className="requiredFieldLabel">Field Required</h1>}


        {/* ----------------------------------------------------- TAG COLOR FIELD ------------------------------------------------------  */}
        <label htmlFor="tagColor" className="labels">
          {view=='create' && "Select"} Tag color *
        </label>
        <input
          type="color"
          id="tagColor"
          value={tagColor}
          disabled={view=='readonly'}
          onChange={(e) => {
            setTagColor(e.target.value);
            setFormErrors({
              ...formErrors,
              tag: false,
            });
          }}
          className={`${view=='readonly' ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
        <h1>{tagColor}</h1>

        {/* ----------------------------------------------------- SUBMIT BUTTON ------------------------------------------------------  */}
        {view!='readonly' ? <button
          className="btn w-60 lg:w-72 p-4 mt-2 bg-lightPurp rounded-md mx-auto text-white bg-opacity-65 focus:outline-none"
          type="submit"
          onClick={() => handleSubmit()}
        >
          {isLoading ? (
            <div className="flex gap-2 items-center justify-center">
            <span>Adding</span>
            <ClipLoader
              color={'white'}
              loading={isLoading}
              cssOverride={loaderCss}
              size={20}
              aria-label="Adding new task ..."
              data-testid="loader"
              />
              </div>
          ) : 
            view=="editable" ? "Save" : "CREATE"
          }
        </button> : null
        }
      </form>
    </div>
  );
}
export default TaskInfoModal;
