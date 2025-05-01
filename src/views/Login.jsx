import { createRef, useState } from "react";
import { Link } from "react-router-dom";
// import clientAxios from "../config/axios";
import AlertError from "./AlertError";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const [errors, setErrors] = useState([]);
  const { login } = useAuth({ middleware: "guest", url: "/" });
  // const { logout } = useAuth({ middleware: "auth" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    login(dataObj, setErrors);
  };
  return (
    <>
      <h1 className="text-4xl font-black text-gray-800 dark:text-white">
        Iniciar Sesión
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Para guardar tus consultas frecuentes
      </p>
      <div className="bg-white dark:bg-neutral-700 shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errors
            ? errors.map((error, index) => {
                return <AlertError key={index}>{error}</AlertError>;
              })
            : null}
          <div className="mb-4">
            <label
              className="text-slate-800 dark:text-gray-300"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="mt-2 w-full p-3 bg-gray-100 dark:bg-neutral-600 dark:text-white dark:placeholder-gray-400"
              name="email"
              placeholder="Tu Email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800 dark:text-gray-300"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="mt-2 w-full p-3 bg-gray-100 dark:bg-neutral-600 dark:text-white dark:placeholder-gray-400"
              name="password"
              placeholder="Tu Password"
              ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link
          to="/auth/register"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          ¿No tienes cuenta? Crea una
        </Link>
      </nav>
      {/* <button type="button" onClick={logout}>
        logout
      </button> */}
    </>
  );
}
