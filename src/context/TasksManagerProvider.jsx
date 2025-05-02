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
                // getTasksAllTasks();

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
    const getTasksAllTasks = async () => {
        try {
            const token = localStorage.getItem("AUTH_TOKEN");
            if (!token) return;

            const { data } = await clientAxios(`/api/Task/getall`);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getMyTasks = async () => {
        try {
            const token = localStorage.getItem("AUTH_TOKEN");
            if (!token) return;
            const { data } = await clientAxios(`/api/Task/mytasks`);
            setTasks(data);
        } catch (error) {
            console.log(error);
        }
    }

    const addTask = async (task) => {
        try {
            const { data } = await clientAxios.post('/api/Task/create', task);
            setTasks([...tasks, data]);
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, task) => {
        try {
            let response = await clientAxios.put(`/api/Task/update/${id}`, task);
            console.log("responseUpdateTask", response);
            const { data } = response;
            setTasks(tasks.map(task => task.taskId === id ? data : task));
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            let response = await clientAxios.delete(`/api/Task/delete/${id}`);
            console.log("responseDeleteTask", response);
            setTasks(tasks.filter(task => task.taskId !== id));
        } catch (error) {
            console.log(error);
        }
    };

    // Cargar tareas solo si el usuario está autenticado
    useEffect(() => {
        if (user) {
            getTasksAllTasks();
        }
    }, [user]);

    return (
        <TasksManagerContext.Provider value={{
            tasks,
            addTask,
            updateTask,
            deleteTask,
            getTasksAllTasks,
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