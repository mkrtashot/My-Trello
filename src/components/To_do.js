import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ACTION_TYPES } from "../App";
import { useHeader, usePage } from "../assets/jss/home";
import AddNewTaskButton from "./AddNewTaskButton";
import EditColumn from "./EditColumn";
import EditToDo from "./EditToDo";
import useUserContext from "../hooks/useUserContext";
import TaskNamePart from "./TaskNamePart";
import userPhoto from "../assets/pictures/user.png";
import { useTasks } from "../assets/jss/todo";

export default function To_do() {
  const { state, dispatch } = useUserContext();

  const [isAddColumnButtonToggled, setAddColumnButtonToggled] = useState(false);
  const [catchNewColumnName, setCatchNewColumnName] = useState("");
  const [modalBackground, setModalBackground] = useState("");

  const header = useHeader();
  const page = usePage();
  const tasksCss = useTasks();

  const {
    state: { tasks, index },
  } = useLocation();
  const navigate = useNavigate();

  if (!tasks) {
    navigate("/");
  }

  // tasks = [
  // 	{
  // 		columnName: "test",
  // 		insideTasks: [
  // 			{
  // 				id: "",
  // 				title: "",
  // 				description: "",
  // 				status: ["todo", "doing", "tone"],
  // 				priority: ["low", "medium", "high"],
  // 			},
  // 		],
  // 	},
  // ];

  useEffect(() => {});

  function addColumn() {
    if (catchNewColumnName !== "") {
      dispatch({
        type: ACTION_TYPES.ADD_COLUMN,
        newColumn: { columnName: catchNewColumnName, insideTasks: [] },
        index: index,
      });
      setAddColumnButtonToggled(false);
      setCatchNewColumnName("");
    }
  }

  function insertNewColumn() {
    return (
      <div className={page.inputCenter}>
        <input
          className={page.input}
          placeholder="Type your new column name"
          onChange={(e) => {
            setCatchNewColumnName(e.target.value);
          }}
        ></input>
        <button className={page.button} onClick={addColumn}>
          Add
        </button>
        <button
          className={page.button}
          onClick={() => setAddColumnButtonToggled(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  function tasksPart() {
    return (
      <div className={tasksCss.tasksPart}>
        {state.workspace[index].tasks.map((it, ind) => {
          return (
            <div key={ind} className={tasksCss.tasks}>
              <div>
                <div className={tasksCss.taskTitle}>{it.columnName}</div>
                <div className={tasksCss.editColumn}>
                  <EditColumn index={index} ind={ind} it={it} />
                </div>
                <div className={tasksCss.taskInfo}>
                  <AddNewTaskButton index={index} ind={ind} />
                  <div>
                    {it.insideTasks.map((insideTask, insideTaskIndex) => {
                      if (insideTask.priority === "high") {
                        return (
                          <div key={insideTaskIndex}>
                            <TaskNamePart
                              title={insideTask.title}
                              index={index}
                              ind={ind}
                              insideTaskIndex={insideTaskIndex}
                              insideTask={insideTask}
                            />
                            <EditToDo
                              modalBackground={modalBackground}
                              setModalBackground={setModalBackground}
                              index={index}
                              ind={ind}
                              insideTaskIndex={insideTaskIndex}
                              insideTask={insideTask}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  {it.insideTasks.map((insideTask, insideTaskIndex) => {
                    if (insideTask.priority === "medium") {
                      return (
                        <div key={insideTaskIndex}>
                          <TaskNamePart
                            title={insideTask.title}
                            index={index}
                            ind={ind}
                            insideTaskIndex={insideTaskIndex}
                            insideTask={insideTask}
                          />
                          <EditToDo
                            modalBackground={modalBackground}
                            setModalBackground={setModalBackground}
                            index={index}
                            ind={ind}
                            insideTaskIndex={insideTaskIndex}
                            insideTask={insideTask}
                          />
                        </div>
                      );
                    }
                  })}

                  {it.insideTasks.map((insideTask, insideTaskIndex) => {
                    if (insideTask.priority === "low") {
                      return (
                        <div key={insideTaskIndex}>
                          <TaskNamePart
                            title={insideTask.title}
                            index={index}
                            ind={ind}
                            insideTaskIndex={insideTaskIndex}
                            insideTask={insideTask}
                          />
                          <EditToDo
                            modalBackground={modalBackground}
                            setModalBackground={setModalBackground}
                            index={index}
                            ind={ind}
                            insideTaskIndex={insideTaskIndex}
                            insideTask={insideTask}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div id="outsideModal" className={modalBackground}>
        <div className={header.header}>
          <div className={header.logo}>My Fake Trello</div>
          <div className={header.userPart}>
            <div className={header.userName}>{state.userName}</div>
            <img src={userPhoto} className={header.userPhoto} />
          </div>
        </div>
        {(isAddColumnButtonToggled && insertNewColumn()) || (
          <div className={page.buttonContainer}>
            <button
              className={page.buttonCenter}
              onClick={() => setAddColumnButtonToggled(true)}
            >
              Add new column
            </button>{" "}
          </div>
        )}
        {tasksPart()}
      </div>
    </>
  );
}
