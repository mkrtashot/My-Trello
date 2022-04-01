import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ACTION_TYPES } from "../App";
import { usePage } from "../assets/jss/home";
import { useInsideModal } from "../assets/jss/modal";
import useClickOutside from "../hooks/useClickOutside";
import useUserContext from "../hooks/useUserContext";

export default function Modal({
  index,
  ind,
  insideTaskIndex,
  insideTask,
  setMainButtonToggled,
  setModalBackground,
}) {
  const { state, dispatch } = useUserContext();

  const [taskName, setTaskName] = useState(
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].title
  );
  const [isNameToggled, setNameToggled] = useState(false);
  const [description, setDescription] = useState(
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].description
  );
  const [isDescriptionToggled, setDescriptionToggled] = useState(false);
  const [priority, setPriority] = useState(
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].priority
  );
  const [isPriorityToggled, setPriorityToggled] = useState(false);
  const [status, setStatus] = useState(
    state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].status
  );
  const [isStatusToggled, setStatusToggled] = useState(false);

  const ref = useRef(null);

  useClickOutside(ref, closeModal);

  const modal = useInsideModal();
  const page = usePage();

  useEffect(() => {
    console.log(state.workspace[index].tasks[ind].insideTasks[insideTaskIndex]);
  });

  function closeModal() {
    setMainButtonToggled(false);
    setModalBackground("");
  }

  // title
  function editName() {
    dispatch({
      type: ACTION_TYPES.EDIT_TASK_NAME,
      index: index,
      ind: ind,
      insideTaskIndex: insideTaskIndex,
      editedTaskName: taskName,
    });
    setNameToggled(false);
    setTaskName(
      state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].title
    );
    closeModal();
  }

  function editNameButton() {
    setNameToggled(true);
  }

  function beforeToggleTitle() {
    return (
      <>
        {state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].title}
        <button className={page.button} onClick={editNameButton}>
          Edit name
        </button>
      </>
    );
  }

  function cancelTitleButton() {
    setNameToggled(false);
  }

  function afterToggleTitle() {
    return (
      <>
        <input
          className={modal.input}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter new taskname"
          //   value={taskName}
        ></input>
        <button className={page.button} onClick={editName}>
          Edit
        </button>
        <button className={page.button} onClick={cancelTitleButton}>
          Cancel
        </button>
      </>
    );
  }

  // description
  function editDescription() {
    dispatch({
      type: ACTION_TYPES.EDIT_DESCRIPTION,
      index: index,
      ind: ind,
      insideTaskIndex: insideTaskIndex,
      editedDescription: description,
    });
    setDescriptionToggled(false);
    setDescription(
      state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].description
    );
  }

  function editDescriptionButton() {
    setDescriptionToggled(true);
  }

  function beforeToggleDescription() {
    return (
      <>
        {
          state.workspace[index].tasks[ind].insideTasks[insideTaskIndex]
            .description
        }
        <button className={page.button} onClick={editDescriptionButton}>
          Edit description
        </button>
      </>
    );
  }

  function cancelDescriptionButton() {
    setDescriptionToggled(false);
  }

  function afterToggleDescription() {
    return (
      <>
        <input
          className={modal.input}
          placeholder="Enter new description"
          onChange={(e) => setDescription(e.target.value)}
          //   value={description}
        ></input>
        <button className={page.button} onClick={editDescription}>
          Edit
        </button>
        <button className={page.button} onClick={cancelDescriptionButton}>
          Cancel
        </button>
      </>
    );
  }

  // priority
  function editPriority() {
    dispatch({
      type: ACTION_TYPES.EDIT_PRIORITY,
      index: index,
      ind: ind,
      insideTaskIndex: insideTaskIndex,
      editedPriority: priority,
    });
    setPriorityToggled(false);
    setPriority(
      state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].priority
    );
    closeModal();
  }

  function editPriorityButton() {
    setPriorityToggled(true);
  }

  function beforeTogglePriority() {
    return (
      <>
        {
          state.workspace[index].tasks[ind].insideTasks[insideTaskIndex]
            .priority
        }
        <button className={page.button} onClick={editPriorityButton}>
          Edit priority
        </button>
      </>
    );
  }

  function cancelPriorityButton() {
    setPriorityToggled(false);
  }

  function afterTogglePriority() {
    return (
      <>
        <select
          id="edit priority"
          onChange={(e) => {
            setPriority(e.target.value);
          }}
          value={priority}
        >
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button className={page.button} onClick={editPriority}>
          Edit
        </button>
        <button className={page.button} onClick={cancelPriorityButton}>
          Cancel
        </button>
      </>
    );
  }

  // status
  function editStatus() {
    if (
      status !==
        state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].status &&
      status !== ""
    ) {
      dispatch({
        type: ACTION_TYPES.EDIT_STATUS,
        index: index,
        ind: ind,
        insideTaskIndex: insideTaskIndex,
        editedStatus: status,
        insideTask: insideTask,
      });
      closeModal();
    }

    setStatusToggled(false);
    setStatus("");
    closeModal();
  }

  function editStatusButton() {
    setStatusToggled(true);
  }

  function beforeToggleStatus() {
    return (
      <>
        {state.workspace[index].tasks[ind].insideTasks[insideTaskIndex].status}
        <button className={page.button} onClick={editStatusButton}>
          Edit status
        </button>
      </>
    );
  }

  function cancelStatusButton() {
    setStatusToggled(false);
  }

  function afterToggleStatus() {
    return (
      <>
        <select
          id="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          value={status}
        >
          <option selected hidden>
            Choose here
          </option>
          {state.workspace[index].tasks.map(
            (selectStatus, selectStatusIndex) => {
              if (selectStatusIndex !== ind) {
                return (
                  <option key={selectStatusIndex}>
                    {selectStatus.columnName}
                  </option>
                );
              }
            }
          )}
        </select>
        <button className={page.button} onClick={editStatus}>
          Edit
        </button>
        <button className={page.button} onClick={cancelStatusButton}>
          Cancel
        </button>
      </>
    );
  }

  return createPortal(
    <div ref={ref} className={modal.modalPart}>
      <div className={modal.insideModal}>
        <span>Task name: {` `}</span>
        {(isNameToggled && afterToggleTitle()) || beforeToggleTitle()} <br />
        <span>Description: {` `}</span>
        {(isDescriptionToggled && afterToggleDescription()) ||
          beforeToggleDescription()}{" "}
        <br />
        <span>Priority: {` `}</span>
        {(isPriorityToggled && afterTogglePriority()) ||
          beforeTogglePriority()}{" "}
        <br />
        <span>Status: {` `}</span>
        {(isStatusToggled && afterToggleStatus()) || beforeToggleStatus()}{" "}
        <br />
        <button className={page.button} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("root")
  );
}
