import clientAxios from "../config/axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

const TasksManagerContext = createContext();

const TasksManagerProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) return;
      
      const { data } = await clientAxios(`/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clientAxios.post('/api/tasks', task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      const { data } = await clientAxios.put(`/api/tasks/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(task => task.id === id ? data : task));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      await clientAxios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TasksManagerContext.Provider value={{ 
      tasks, 
      addTask,
      updateTask,
      deleteTask,
      getTasks 
    }}>
      {children}
    </TasksManagerContext.Provider>
  );
};

export { TasksManagerProvider };

export default TasksManagerContext; 