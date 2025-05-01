import { useEffect } from "react";
import clientAxios from "../config/axios";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, url }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("AUTH_TOKEN");
  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", () => {
    // clientAxios("/api/user", {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
    //   .then((res) => res.data)
    //   .catch((error) => {
    //     throw Error(error?.response?.data?.errors);
    //   })
  });

  const login = async (dataObj, setErrors) => {
    try {
      const { data } = await clientAxios.post("/api/login", dataObj);
      console.log("RESPONSE", data);
      localStorage.setItem("AUTH_TOKEN", data.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      setErrors(Object.values(error.response.data.errors));
    }
  };

  const register = async (dataObj, setErrors) => {
    try {
      console.log("dataObj", dataObj);
      const { data } = await clientAxios.post("/api/Auth/register", dataObj);
      localStorage.setItem('AUTH_TOKEN', data.token);
      setErrors([]);
      await mutate();
    } catch (error) {
      setErrors(Object.values(error.response.data.errors));
    }
  };

  const logout = async () => {
    try {
      await clientAxios.post(
        "/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('AUTH_TOKEN');
      await mutate(undefined);
    } catch (error) {
      throw Error(error?.response?.data?.errors);
    }
  };

  useEffect(() => {
    console.log(middleware, url, user);
    if (middleware == "guest" && url && user) {
      navigate(url);
    }
    if (middleware == "auth" && error) {
      console.log("enviar a auth");
      //   navigate('auth/login');
    }
  }, [user, error]);

  return {
    login,
    register,
    logout,
    user,
    error,
  };
};
