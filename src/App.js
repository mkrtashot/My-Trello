import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./components/Home";
import To_do from "./components/To_do";
import Login from "./components/Login";
import { createContext, useEffect, useReducer } from "react";
import Register from "./components/Register";

const defaultState = {
  name: null,
  userName: null,
  workspace: [
    // {
    // 	spaceName: "test",
    // 	tasks: [
    // 		// {
    // 		// 	columnName: "test",
    // 		// 	insideTasks: [],
    // 		// },
    // 		// {
    // 		// 				id: "",
    // 		// 				title: "",
    // 		// 				description: "",
    // 		// 				status: ["todo", "doing", "tone"],
    // 		// 				priority: ["low", "medium", "high"],
    // 		// 			},
    // 	],
    // },
  ],
};

export const State = createContext(defaultState);

export const ACTION_TYPES = {
  CHANGE_USER_NAME: "CHANGE_USER_NAME",
  ADD_WORKSPACE: "ADD_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE_NAME: "EDIT_WORKSPACE_NAME",
  ADD_COLUMN: "ADD_COLUMN",
  EDIT_COLUMN_NAME: "EDIT_COLUMN_NAME",
  DELETE_COLUMN: "DELETE_COLUMN",
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK_NAME: "EDIT_TASK_NAME",
  EDIT_DESCRIPTION: "EDIT_DESCRIPTION",
  EDIT_PRIORITY: "EDIT_PRIORITY",
  EDIT_STATUS: "EDIT_STATUS",
};

function userControl(state, action) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_USER_NAME: {
      return { ...state, userName: action.newUserName };
    }
    case ACTION_TYPES.ADD_WORKSPACE: {
      return { ...state, workspace: [...state.workspace, action.newWorkspace] };
    }
    case ACTION_TYPES.DELETE_WORKSPACE: {
      const newWorkspace = state.workspace.filter((item, ind) => {
        if (ind !== action.index) {
          return item;
        }
      });
      return { ...state, workspace: newWorkspace };
    }
    case ACTION_TYPES.EDIT_WORKSPACE_NAME: {
      const newWorkspace = state.workspace.map((it, ind) => {
        if (ind !== action.index) {
          return it;
        } else {
          return action.editedWorkspace;
        }
      });
      return { ...state, workspace: newWorkspace };
    }
    case ACTION_TYPES.ADD_COLUMN: {
      const newColumnName = state.workspace.map((item, ind) => {
        if (ind !== action.index) {
          return item;
        } else {
          return {
            ...item,
            tasks: [...item.tasks, action.newColumn],
          };
        }
      });
      return { ...state, workspace: newColumnName };
    }
    case ACTION_TYPES.EDIT_COLUMN_NAME: {
      const editedColumnWorkspace = state.workspace.map((work, workIndex) => {
        if (workIndex !== action.index) {
          return work;
        } else {
          const editedColumn = work.tasks.map((task, taskIndex) => {
            if (taskIndex !== action.ind) {
              return task;
            } else {
              return action.editedColumn;
            }
          });
          return {
            ...work,
            tasks: editedColumn,
          };
        }
      });
      return { ...state, workspace: editedColumnWorkspace };
    }
    case ACTION_TYPES.DELETE_COLUMN: {
      const editedColumnWorkspace = state.workspace.map((work, workIndex) => {
        if (workIndex !== action.index) {
          return work;
        } else {
          const editedColumn = work.tasks.filter((task, taskIndex) => {
            if (taskIndex !== action.ind) {
              return task;
            }
          });
          return {
            ...work,
            tasks: editedColumn,
          };
        }
      });
      return { ...state, workspace: editedColumnWorkspace };
    }
    case ACTION_TYPES.ADD_TASK: {
      const newColumnName = state.workspace.map((item, ind) => {
        if (ind !== action.index) {
          return item;
        } else {
          const newTasks = item.tasks.map((task, taskIndex) => {
            if (taskIndex !== action.ind) {
              return task;
            } else {
              return {
                ...task,
                insideTasks: [...task.insideTasks, action.newTask],
              };
            }
          });

          return {
            ...item,
            tasks: newTasks,
          };
        }
      });
      return { ...state, workspace: newColumnName };
    }
    case ACTION_TYPES.DELETE_TASK: {
      const newColumnName = state.workspace.map((item, ind) => {
        if (ind !== action.index) {
          return item;
        } else {
          const newTasks = item.tasks.map((task, taskIndex) => {
            if (taskIndex !== action.ind) {
              return task;
            } else {
              const newInsideTask = task.insideTasks.filter(
                (insideTask, insideTaskIndex) => {
                  if (insideTaskIndex !== action.insideTaskIndex) {
                    return insideTask;
                  }
                }
              );
              return { ...task, insideTasks: newInsideTask };
            }
          });
          return { ...item, tasks: newTasks };
        }
      });
      return { ...state, workspace: newColumnName };
    }
    case ACTION_TYPES.EDIT_TASK_NAME: {
      const editedColumnName = state.workspace.map(
        (workspace, workspaceIndex) => {
          if (workspaceIndex !== action.index) {
            return workspace;
          } else {
            const editedTask = workspace.tasks.map((task, taskIndex) => {
              if (taskIndex !== action.ind) {
                return task;
              } else {
                const editedInsideTask = task.insideTasks.map(
                  (insideTasks, insideTasksIndex) => {
                    if (insideTasksIndex !== action.insideTaskIndex) {
                      return insideTasks;
                    } else {
                      return { ...insideTasks, title: action.editedTaskName };
                    }
                  }
                );
                return { ...task, insideTasks: editedInsideTask };
              }
            });
            return { ...workspace, tasks: editedTask };
          }
        }
      );
      return { ...state, workspace: editedColumnName };
    }
    case ACTION_TYPES.EDIT_DESCRIPTION: {
      const editedColumnName = state.workspace.map(
        (workspace, workspaceIndex) => {
          if (workspaceIndex !== action.index) {
            return workspace;
          } else {
            const editedTask = workspace.tasks.map((task, taskIndex) => {
              if (taskIndex !== action.ind) {
                return task;
              } else {
                const editedInsideTask = task.insideTasks.map(
                  (insideTasks, insideTasksIndex) => {
                    if (insideTasksIndex !== action.insideTaskIndex) {
                      return insideTasks;
                    } else {
                      return {
                        ...insideTasks,
                        description: action.editedDescription,
                      };
                    }
                  }
                );
                return { ...task, insideTasks: editedInsideTask };
              }
            });
            return { ...workspace, tasks: editedTask };
          }
        }
      );
      return { ...state, workspace: editedColumnName };
    }
    case ACTION_TYPES.EDIT_PRIORITY: {
      const editedColumnName = state.workspace.map(
        (workspace, workspaceIndex) => {
          if (workspaceIndex !== action.index) {
            return workspace;
          } else {
            const editedTask = workspace.tasks.map((task, taskIndex) => {
              if (taskIndex !== action.ind) {
                return task;
              } else {
                const editedInsideTask = task.insideTasks.map(
                  (insideTasks, insideTasksIndex) => {
                    if (insideTasksIndex !== action.insideTaskIndex) {
                      return insideTasks;
                    } else {
                      return {
                        ...insideTasks,
                        priority: action.editedPriority,
                      };
                    }
                  }
                );
                return { ...task, insideTasks: editedInsideTask };
              }
            });
            return { ...workspace, tasks: editedTask };
          }
        }
      );
      return { ...state, workspace: editedColumnName };
    }
    case ACTION_TYPES.EDIT_STATUS: {
      // const editedWorkspace = state.workspace.map((work, workIndex) => {
      // 	if (workIndex !== action.index) {
      // 		return work;
      // 	} else {
      // 		const editedTask = work.tasks.map((task, taskIndex) => {
      // 			if (task.spaceName === action.editedStatus) {
      // 				return {
      // 					...task,
      // 					insideTasks: [...task.insideTasks, action.insideTask],
      // 				};
      // 			}
      // 		});
      // 		return { ...work, tasks: editedTask };
      // 	}
      // });
      // return { ...state, workspace: editedWorkspace };
      const editedWorkspace = state.workspace.map(
        (workspace, workspaceIndex) => {
          if (workspaceIndex !== action.index) {
            return workspace;
          } else {
            const editedTasks = workspace.tasks.map((task, taskIndex) => {
              if (
                task.columnName !== action.editedStatus &&
                taskIndex !== action.ind
              ) {
                return task;
              } else if (taskIndex === action.ind) {
                const filteredTask = task.insideTasks.filter(
                  (insideTask, insideTaskIndex) => {
                    if (insideTaskIndex !== action.insideTaskIndex) {
                      return insideTask;
                    }
                  }
                );
                return { ...task, insideTasks: filteredTask };
              } else {
                return {
                  ...task,
                  insideTasks: [
                    ...task.insideTasks,
                    { ...action.insideTask, status: action.editedStatus },
                  ],
                };
              }
            });
            return { ...workspace, tasks: editedTasks };
          }
        }
      );
      return { ...state, workspace: editedWorkspace };
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(userControl, defaultState);

  useEffect(() => console.log(state));

  return (
    <State.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute user={!!state.userName} />}>
            <Route path="/" element={<Home />} />
            <Route path="/to-do" element={<To_do />} />
          </Route>

          <Route
            path="/login"
            element={<Login dispatch={(val) => dispatch(val)} state={state} />}
          />
        </Routes>
      </BrowserRouter>
    </State.Provider>
  );
}

export default App;
