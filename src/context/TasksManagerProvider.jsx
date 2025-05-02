import clientAxios from "../config/axios";
import { useEffect, useState, createContext } from "react";

const TasksManagerContext = createContext();

const TasksManagerProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("AUTH_TOKEN");
      const userName = localStorage.getItem("USER_NAME");
      
      if (token && userName) {
        setUser({ token, userName });
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Métodos de autenticación
  const login = async (dataObj, setErrors, navigate) => {
    try {
      const { data } = await clientAxios.post("/api/Auth/login/", dataObj);
      console.log("ResponseLogin", data);
      if (data.isSuccess) {
        localStorage.setItem("AUTH_TOKEN", data.token);
        localStorage.setItem("USER_NAME", data.userName);
        
        // Actualizar estado del usuario
        setUser({ token: data.token, userName: data.userName });
        setErrors([]);
        
        // Cargar tareas después de login
        // getTasks();
        
        // Redirigir a home
        navigate("/");
        return;
      }
      
      setErrors([!data?.token ? "Usuario o contraseña incorrectos" : ""]);
    } catch (error) {
      console.log("errorLogin:", error);
      setErrors(Object.values(error.response?.data?.errors || { error: "Error al iniciar sesión" }));
    }
  };

  const register = async (dataObj, setErrors, navigate) => {
    try {
      console.log("dataObjRegister", dataObj);
      const { data } = await clientAxios.post("/api/Auth/register/", dataObj);
      
      if (data.isSuccess) {
        // localStorage.setItem("AUTH_TOKEN", data.token);
        // localStorage.setItem("USER_NAME", data.userName || dataObj.name);
        
        // // Actualizar estado del usuario
        // setUser({ token: data.token, userName: data.userName || dataObj.name });
        setErrors([]);
        
        // Redirigir a home
        // navigate("/");
      } else {
        setErrors(["No se pudo completar el registro"]);
      }
    } catch (error) {
      console.log("error:", error);
      setErrors(Object.values(error.response?.data?.errors || { error: "Error al registrarse" }));
    }
  };

  const logout = (navigate) => {
    // Limpiar localStorage
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_NAME');
    
    // Actualizar estado
    setUser(null);
    setTasks([]);
    
    // Redirigir a login
    navigate("/auth/login");
  };

  // Métodos de tareas
  const getTasks = async () => {
    try {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (!token) return;
      
      const { data } = await clientAxios(`/api/tasks`);
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (task) => {
    try {
      const { data } = await clientAxios.post('/api/tasks', task);
      setTasks([...tasks, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const { data } = await clientAxios.put(`/api/tasks/${id}`, task);
      setTasks(tasks.map(task => task.id === id ? data : task));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await clientAxios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar tareas solo si el usuario está autenticado
  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user]);

  return (
    <TasksManagerContext.Provider value={{ 
      tasks, 
      addTask,
      updateTask,
      deleteTask,
      getTasks,
      user,
      login,
      register,
      logout,
      loading
    }}>
      {children}
    </TasksManagerContext.Provider>
  );
};

export { TasksManagerProvider };

export default TasksManagerContext; 