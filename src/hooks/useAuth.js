import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TasksManagerContext from "../context/TasksManagerProvider";

export const useAuth = ({ middleware, url }) => {
  const { user, login, register, logout, loading } = useContext(TasksManagerContext);
  const navigate = useNavigate();

  const handleLogin = async (dataObj, setErrors) => {
    await login(dataObj, setErrors, navigate);
  };

  const handleRegister = async (dataObj, setErrors) => {
    await register(dataObj, setErrors, navigate);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    // Si el usuario está autenticado y está en una ruta de invitado, redirigir a url
    if (middleware === "guest" && url && user && !loading) {
      navigate(url);
    }
    
    // Si el usuario no está autenticado y está en una ruta protegida, redirigir a login
    if (middleware === "auth" && !user && !loading) {
      navigate('/auth/login');
    }
  }, [user, loading, middleware, url, navigate]);

  return {
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    user,
    loading
  };
};
