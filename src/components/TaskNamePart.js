import React, { useState } from "react";
import { ACTION_TYPES } from "../App";
import { usePage } from "../assets/jss/home";
import { useTasks } from "../assets/jss/todo";
import useUserContext from "../hooks/useUserContext";

export default function TaskNamePart({
  title,
  index,
  ind,
  insideTaskIndex,
  insideTask,
}) {
  const [isDone, setDone] = useState("");
  const { state, dispatch } = useUserContext();

  const tasksCss = useTasks();
  const page = usePage();
  let whichTask = "";
  if (
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].priority ===
    "high"
  ) {
    whichTask = "tasksHigh";
  } else if (
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].priority ===
    "medium"
  ) {
    whichTask = "tasksMedium";
  } else {
    whichTask = "tasksLow";
  }

  function doneUndone() {
    if (isDone === "") {
      setDone("done");
    } else {
      setDone("");
    }
  }

  function deleteTask() {
    dispatch({
      type: ACTION_TYPES.DELETE_TASK,
      index: index,
      ind: ind,
      insideTaskIndex: insideTaskIndex,
    });
  }

  return (
    <div className={tasksCss[whichTask]}>
      <div className={tasksCss.taskName}>
        <div className={isDone}>{title}</div>
      </div>
      <button className={page.button} onClick={doneUndone}>
        Mark as Done
      </button>
      <button className={page.button} onClick={deleteTask}>
        Delete Task
      </button>
    </div>
  );
}
