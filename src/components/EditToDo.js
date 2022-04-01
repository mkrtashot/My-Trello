import React, { useState } from "react";
import { usePage } from "../assets/jss/home";
import { useTasks } from "../assets/jss/todo";
import Modal from "./Modal";

export default function EditToDo({
  index,
  ind,
  insideTaskIndex,
  insideTask,
  modalBackground,
  setModalBackground,
}) {
  const [isMainButtonToggled, setMainButtonToggled] = useState(false);

  const page = usePage();
  const tasksCss = useTasks();

  // {
  // 				id: "",
  // 				title: "",
  // 				description: "",
  // 				status: ["todo", "doing", "tone"],
  // 				priority: ["low", "medium", "high"],
  // 			},

  function clickHandler() {
    setMainButtonToggled(true);
    setModalBackground("opacity");
  }

  return (
    <>
      {(isMainButtonToggled && (
        <Modal
          setModalBackground={setModalBackground}
          isMainButtonToggled={isMainButtonToggled}
          setMainButtonToggled={setMainButtonToggled}
          index={index}
          ind={ind}
          insideTask={insideTask}
          insideTaskIndex={insideTaskIndex}
        />
      )) || (
        <div className={tasksCss.modalButton}>
          <button className={page.button} onClick={clickHandler}>
            More info
          </button>
        </div>
      )}
    </>
  );
}
