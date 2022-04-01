import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ACTION_TYPES } from "../App";
import EditWorkspaceName from "./EditWorkspaceName";
import useUserContext from "../hooks/useUserContext";
import userPhoto from "../assets/pictures/user.png";
import { useHeader, usePage } from "../assets/jss/home";
import { initializeApp } from "firebase/app";
import {
  arrayUnion,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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
                    to="/to-do"
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
        <button className={page.button} onClick={() => setButtonToggle(false)}>
          Close
        </button>
      </div>
    );
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
          <button
            className={page.buttonCenter}
            onClick={() => setButtonToggle(true)}
          >
            Add Workspace
          </button>
        </div>
      )}
      {workspaceDraw()}
    </>
  );
}
