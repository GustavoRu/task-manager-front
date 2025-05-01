import { useContext } from "react";
import TasksManagerContext from "../context/TasksManagerProvider";

const useTasksManager = () => {
  return useContext(TasksManagerContext);
};

export default useTasksManager; 