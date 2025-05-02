import clientAxios from "../config/axios";
import { useEffect, useState, createContext } from "react";

const TasksManagerContext = createContext();

const TasksManagerProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Estado para notificaciones
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        type: 'success', // 'success' o 'error'
        duration: 3000 // duración en milisegundos
    });

    // Función para mostrar notificación
    const showNotification = (message, type = 'success', duration = 5000) => {
        setNotification({
            open: true,
            message,
            type,
            duration
        });
    };

    // Función para cerrar notificación
    const closeNotification = () => {
        setNotification({
            ...notification,
            open: false
        });
    };

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

                // Mostrar notificación de éxito
                showNotification('Inicio de sesión exitoso');

                // Redirigir a home
                navigate("/");
                return;
            }

            setErrors([!data?.token ? "Usuario o contraseña incorrectos" : ""]);
        } catch (error) {
            console.log("errorLogin:", error);
            setErrors(Object.values(error.response?.data?.errors || { error: "Error al iniciar sesión" }));
            // showNotification('Error al iniciar sesión', 'error');
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
                showNotification('Registro exitoso. Ahora puedes iniciar sesión.');

                // Redirigir a home
                // navigate("/");
            } else {
                setErrors(["No se pudo completar el registro"]);
                // showNotification('No se pudo completar el registro', 'error');
            }
        } catch (error) {
            console.log("error:", error);
            setErrors(Object.values(error.response?.data?.errors || { error: "Error al registrarse" }));
            // showNotification('Error al registrarse', 'error');
        }
    };

    const logout = (navigate) => {
        // Limpiar localStorage
        localStorage.removeItem('AUTH_TOKEN');
        localStorage.removeItem('USER_NAME');
        localStorage.removeItem('USER_ID');
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
            showNotification('Error al cargar todas las tareas', 'error');
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
            showNotification('Error al cargar tus tareas', 'error');
        }
    }

    const addTask = async (task) => {
        try {
            const { data } = await clientAxios.post('/api/Task/create', task);
            setTasks([...tasks, data]);
            showNotification('Tarea creada correctamente');
            return true;
        } catch (error) {
            console.log(error);
            showNotification('Error al crear la tarea', 'error');
            return false;
        }
    };

    const updateTask = async (id, task) => {
        try {
            let response = await clientAxios.put(`/api/Task/update/${id}`, task);
            console.log("responseUpdateTask", response);
            const { data } = response;
            setTasks(tasks.map(task => task.taskId === id ? data : task));
            showNotification('Tarea actualizada correctamente');
            return true;
        } catch (error) {
            console.log(error);
            showNotification('Error al actualizar la tarea', 'error');
            return false;
        }
    };

    const deleteTask = async (id) => {
        try {
            let response = await clientAxios.delete(`/api/Task/delete/${id}`);
            console.log("responseDeleteTask", response);
            setTasks(tasks.filter(task => task.taskId !== id));
            showNotification('Tarea eliminada correctamente');
            return true;
        } catch (error) {
            console.log(error);
            showNotification('Error al eliminar la tarea', 'error');
            return false;
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
            getMyTasks,
            user,
            login,
            register,
            logout,
            loading,
            notification,
            showNotification,
            closeNotification
        }}>
            {children}
        </TasksManagerContext.Provider>
    );
};

export { TasksManagerProvider };

export default TasksManagerContext; 