import React, { useEffect, useState } from "react";
import { ACTION_TYPES } from "../App";
import { usePage } from "../assets/jss/home";
import { useTasks } from "../assets/jss/todo";
import useUserContext from "../hooks/useUserContext";

export default function AddNewTaskButton({ index, ind }) {
  const { state, dispatch } = useUserContext();

  const [isAddTaskButtonToggled, setAddTaskButtonToggled] = useState(false);
  const [catchNewTaskName, setCatchNewTaskName] = useState("");
  const [catchDescription, setCatchDescription] = useState("");
  const [catchPriority, setCatchPriority] = useState("");

  const tasksCss = useTasks();
  const page = usePage();

  function addTask() {
    // 			{
    // 				id: "",
    // 				title: "",
    // 				description: "",
    // 				status: ["todo", "doing", "tone"],
    // 				priority: ["low", "medium", "high"],
    // 			},

    const newTask = {
      id: Math.random(),
      title: catchNewTaskName,
      description: catchDescription,
      status: state.workspace[index].tasks[ind].columnName,
      priority: catchPriority,
    };

    if (catchNewTaskName !== "" && catchPriority !== "") {
      dispatch({
        type: ACTION_TYPES.ADD_TASK,
        newTask: newTask,
        index: index,
        ind: ind,
      });
      setAddTaskButtonToggled(false);
      setCatchNewTaskName("");
    }
  }

  function insertNewTask() {
    return (
      <div>
        <input
          className={tasksCss.taskInput}
          placeholder="Name"
          onChange={(e) => {
            setCatchNewTaskName(e.target.value);
          }}
        ></input>
        <br />
        <input
          className={tasksCss.taskInput}
          placeholder="Description"
          onChange={(e) => {
            setCatchDescription(e.target.value);
          }}
        ></input>

        {/* <select
					id="status"
					onChange={(e) => {
						setCatchStatus(e.target.value);
					}}
				>
					{user.workspace[index].tasks.map(
						(selectStatus, selectStatusIndex) => {
							return (
								<option value={selectStatus.columnName}>
									{selectStatus.columnName}
								</option>
							);
						}
					)}
				</select> */}
        <select
          className={tasksCss.select}
          id="priority"
          onChange={(e) => {
            setCatchPriority(e.target.value);
          }}
          value={catchPriority}
          required
        >
          <option selected hidden>
            Priority
          </option>
          <option value="low" selected="selected">
            low
          </option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <br />
        <button className={page.button} onClick={addTask}>
          Add Task
        </button>
        <button
          className={page.button}
          onClick={() => setAddTaskButtonToggled(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className={tasksCss.addTaskContainer}>
      {(isAddTaskButtonToggled && insertNewTask()) || (
        <div className={tasksCss.addTaskButton}>
          <button
            className={page.button}
            onClick={() => setAddTaskButtonToggled(true)}
          >
            Add new Task
          </button>
        </div>
      )}
    </div>
  );
}
