import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ACTION_TYPES } from "../App";
import { useHeader, usePage } from "../assets/jss/home";
import useUserContext from "../hooks/useUserContext";
import EditWorkspaceName from "./EditWorkspaceName";
import userPhoto from "../assets/pictures/user.png";

export default function Home() {
  const { state, dispatch } = useUserContext();

  const [isButtonToggled, setButtonToggle] = useState(false);
  const [newWorkspace, setNewWorkspace] = useState("");
  const header = useHeader();
  const page = usePage();

  function deleteWorkspace(index) {
    dispatch({ type: ACTION_TYPES.DELETE_WORKSPACE, index: index });
  }

  function workspaceDraw() {
    return (
      <div className={page.workspacesPart}>
        {state.workspace.map((item, index) => {
          return (
            <div key={index}>
              <div className={page.workspace}>
                <div className={page.linkContainer}>
                  <Link
                    to={"to-do/" + item.spaceName}
                    key={index}
                    state={{ tasks: item.tasks, index: index }}
                    className={page.link}
                  >
                    <div>{item.spaceName}</div>
                  </Link>
                </div>
                <div className={page.insideWorkspaceButtonContainer}>
                  <div className={page.insideButton}>
                    <EditWorkspaceName item={item} index={index} />

                    <button
                      className={page.button}
                      onClick={() => deleteWorkspace(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function addTask() {
    if (newWorkspace !== "") {
      dispatch({
        type: ACTION_TYPES.ADD_WORKSPACE,
        newWorkspace: { spaceName: newWorkspace, tasks: [] },
      });

      setNewWorkspace("");
      setButtonToggle(false);
    }
  }

  function closeNewworkspaceButton() {
    setButtonToggle(false);
  }

  function newWorkspaceName() {
    return (
      <div className={page.inputCenter}>
        <input
          className={page.input}
          placeholder="Type your new Workspace name"
          onChange={(e) => setNewWorkspace(e.target.value)}
          value={newWorkspace}
        ></input>
        <button className={page.button} onClick={addTask}>
          Add
        </button>
        <button className={page.button} onClick={closeNewworkspaceButton}>
          Close
        </button>
      </div>
    );
  }

  function addWorkspaceButton() {
    setButtonToggle(true);
  }

  return (
    <>
      <div className={header.header}>
        <div className={header.logo}>My Fake Trello</div>
        <div className={header.userPart}>
          <div className={header.userName}>{state.userName}</div>
          <img src={userPhoto} className={header.userPhoto} />
        </div>
      </div>
      {(isButtonToggled && newWorkspaceName()) || (
        <div className={page.buttonContainer}>
          <button className={page.buttonCenter} onClick={addWorkspaceButton}>
            Add Workspace
          </button>
        </div>
      )}
      {workspaceDraw()}
    </>
  );
}
