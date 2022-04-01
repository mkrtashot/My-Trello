import React, { useState } from "react";
import { ACTION_TYPES } from "../App";
import { usePage } from "../assets/jss/home";
import { useTasks } from "../assets/jss/todo";
import useUserContext from "../hooks/useUserContext";

export default function EditColumn({ index, ind, it }) {
  const { dispatch } = useUserContext();

  const [isButtonToggled, setButtonToggled] = useState(false);
  const [catchColumnName, setCatchColumnName] = useState("");

  const page = usePage();
  const tasksCss = useTasks();

  function editName() {
    if (catchColumnName !== "") {
      dispatch({
        type: ACTION_TYPES.EDIT_COLUMN_NAME,
        editedColumn: { ...it, columnName: catchColumnName },
        index: index,
        ind: ind,
      });

      setCatchColumnName("");
      setButtonToggled(false);
    }
  }

  function cancelEditColumnNameButton() {
    setButtonToggled(false);
  }

  function editColumnName() {
    return (
      <div>
        <input
          className={tasksCss.input}
          placeholder="Type column name"
          onChange={(e) => setCatchColumnName(e.target.value)}
          value={catchColumnName}
        ></input>
        <button className={page.button} onClick={editName}>
          Edit
        </button>
        <button className={page.button} onClick={cancelEditColumnNameButton}>
          Cancel
        </button>
      </div>
    );
  }
  function deleteColumn() {
    dispatch({ type: ACTION_TYPES.DELETE_COLUMN, index: index, ind: ind });
  }

  function editWorkspaceButton() {
    setButtonToggled(true);
  }

  function beforeTogglePart() {
    return (
      <>
        <button className={page.button} onClick={editWorkspaceButton}>
          Edit
        </button>
        <button className={page.button} onClick={deleteColumn}>
          Delete
        </button>
      </>
    );
  }

  return <>{(isButtonToggled && editColumnName()) || beforeTogglePart()}</>;
}
