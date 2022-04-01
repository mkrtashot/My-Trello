import { useState } from "react";
import React from "react";
import { ACTION_TYPES } from "../App";
import useUserContext from "../hooks/useUserContext";
import { usePage } from "../assets/jss/home";

export default function EditWorkspaceName({ item, index }) {
  const { dispatch } = useUserContext();
  const page = usePage();

  const [catchWorkspaceName, setCatchWorkspaceName] = useState("");
  const [isEditWorkspaceButtonToggled, setEditWorkspaceButtonToggled] =
    useState(false);

  function editName() {
    if (catchWorkspaceName !== "") {
      dispatch({
        type: ACTION_TYPES.EDIT_WORKSPACE_NAME,

        editedWorkspace: { ...item, spaceName: catchWorkspaceName },
        index: index,
      });

      setCatchWorkspaceName("");
      setEditWorkspaceButtonToggled(false);
    }
  }

  function editWorkspaceNameButtonFalse() {
    setEditWorkspaceButtonToggled(false);
  }

  function editWorkspaceName() {
    return (
      <div>
        <input
          className={page.workspaceInput}
          placeholder="Type workspace name"
          onChange={(e) => setCatchWorkspaceName(e.target.value)}
          value={catchWorkspaceName}
        ></input>
        <button className={page.button} onClick={editName}>
          Edit
        </button>
        <button className={page.button} onClick={editWorkspaceNameButtonFalse}>
          Cancel
        </button>
      </div>
    );
  }

  function editWorkspaceNameButtonTrue() {
    setEditWorkspaceButtonToggled(true);
  }

  return (
    <>
      {(isEditWorkspaceButtonToggled && editWorkspaceName()) || (
        <button className={page.button} onClick={editWorkspaceNameButtonTrue}>
          Edit
        </button>
      )}
    </>
  );
}
