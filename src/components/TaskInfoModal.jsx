import { React, useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { X } from "lucide-react";

import { useToDoContext } from "../contexts/ToDoContext";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loaderCss = {
  // display: "block",
  // margin: "0 auto",
  // borderColor: "",
};

// ---------------------------------------------------------- MAIN FUNCTION ----------------------------------------------------

function TaskInfoModal({
  heading = "Task",
  task = {},
  onClose,
  id = "",
  titlee = "",
  tagg = "",
  taggColor = "",
  view = "",
}) {
  const {
    tasks,
    UpdateTask,
    RemoveTask,
    toggleComplete,
    AddTask,
    writingData,
  } = useToDoContext();

  const [title, setTitle] = useState(task && task.title || '');
  // const [title, setTitle] = useState(`${id? id : ''}`);
  const [tag, setTag] = useState(task && task.tag || '');
  const [tagColor, setTagColor] = useState(
    (task && task.tagColor) || "#62ff1f"
  );
  const [formErrors, setFormErrors] = useState({
    title: false,
    tag: false,
    tagColor: false,
  });

  // const [isLoading, setIsLoading] = useState(false);
  const bgRef = useRef();

  // ---------------------------------------------------------------- METHODS ----------------------------------------------------------------

  const closeOnBgTap = (e) => {
    if (bgRef.current == e.target) onClose();
  };

  // ---------------------------------------------------------------- HANDLE SUBMIT ----------------------------------------------------------------

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
      if (navigator.onLine) {
        const task = {
          tag: tag,
          tagColor: tagColor,
          title: title,
          completed: false,
        };
        
        // ************************************************ IF View prop = create , So It should call AddTask method to create a new task
        if (view.toLowerCase() == "create") {
          AddTask(task);
          console.log("Form submitted:", title, "   ", tag, "   ", tagColor);
          // onClose();
          toast.success("Task created ",{autoClose:1000});
        } else {
          // *************************If view prop is editable then submiting form for updating
          UpdateTask({ id, docName: "Tasks", task });
          // onClose();
          console.log("Task to be written after updating ==> ", task);
          // toast.success("Task updated ",{autoClose:1000});
        }
        onClose(); // Close modal after the operation
      } else {
        toast("Chek your internet");
      }
    } else {
      // setIsLoading(false)
      // toast("Failed !",{autoClose:2000});
      console.log("form errors i.e empty fields -> ", formErrors);
    }
  };

  {
    /* ----------------------------------------------------- RETURN ------------------------------------------------------  */
  }
  return (
    <div
      className="flex w-screen h-screen items-center justify-center  fixed inset-0 bg-black bg-opacity-40 backdrop:blur-md "
      // onClick={onClose}
      onClick={closeOnBgTap}
      ref={bgRef}
    >
      {/* ----------------------------------------------------- MODAL FORM ------------------------------------------------------  */}
      <form
        className="flex flex-col w-[80%]  sm:w-[70%] md:w-[60%] lg:w-[50%]  p-8 sm:p-8  rounded-3xl bg-white z-10 animate-openModal"
        // onSubmit={handleSubmit()}
      >
        <div className="flex flex-row mb-4 items-center ">
          <h1 className="text-xl sm:text-2xl ml-auto font-bold text-gray-800">
            {heading}
          </h1>
          <button className="btn ml-auto" onClick={onClose}>
            <X color="#d12323" size={28} />
          </button>
        </div>

        {/* ----------------------------------------------------- TITLE FIELD ------------------------------------------------------  */}
        <label htmlFor="titleField" className="labels">
          Title *
        </label>
        <input
          readOnly={view.toLowerCase() == "readonly"}
          // autoFocus={view.toLowerCase() != "readonly"}
          title={view.toUpperCase()}
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
        {formErrors.title && (
          <h1 className="requiredFieldLabel">Field Required</h1>
        )}

        {/* ----------------------------------------------------- TAG FIELD -------------------------------------------------------------  */}
        <label htmlFor="tagField" className="labels">
          Tag *
        </label>
        <input
          readOnly={view.toLowerCase() == "readonly"}
          title={view.toUpperCase()}
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
        {formErrors.tag && (
          <h1 className="requiredFieldLabel">Field Required</h1>
        )}

        {/* ----------------------------------------------------- TAG COLOR FIELD ------------------------------------------------------  */}
        <label htmlFor="tagColor" className="labels">
          {view.toLowerCase() == "create" && "Select"} Tag color *
        </label>
        <input
          type="color"
          id="tagColor"
          value={tagColor}
          disabled={view.toLowerCase() == "readonly"}
          onChange={(e) => {
            setTagColor(e.target.value);
            setFormErrors({
              ...formErrors,
              tag: false,
            });
          }}
          className={`${
            view.toLowerCase() == "readonly"
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        />
        <h1>{tagColor}</h1>

        {/* ----------------------------------------------------- SUBMIT BUTTON ------------------------------------------------------  */}
        {view.toLowerCase() != "readonly" ? (
          <button
            className="btn w-52 sm:w-60 lg:w-72 p-4 mt-2 text-white  bg-lightPurp  rounded-md mx-auto bg-opacity-65 focus:outline-none"
            type="submit"
            onClick={() => handleSubmit()}
          >
            {writingData ? (
              <div className="flex gap-2 items-center justify-center  sm:text-lg">
                <span className="sm:text-lg">
                  {view.toLowerCase() == "create" ? "Adding" : "Saving"}
                </span>
                <ClipLoader
                  color={"white"}
                  // loading={isLoading}
                  cssOverride={loaderCss}
                  size={20}
                  aria-label="Adding new task ..."
                  data-testid="loader"
                />
              </div>
            ) : view == "editable" ? (
              "Save"
            ) : (
              "CREATE"
            )}
          </button>
        ) : null}
      </form>
    </div>
  );
}
export default TaskInfoModal;
