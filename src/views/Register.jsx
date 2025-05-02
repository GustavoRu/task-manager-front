import { createRef, useState } from "react";
import { Link } from "react-router-dom";
// import clientAxios from "../config/axios";
import AlertError from "./AlertError";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const [errors, setErrors] = useState([]);
  const { register } = useAuth({ middleware: "guest", url: "/" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataObj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      // password_confirmation: passwordConfirmationRef.current.value,
    };
    register(dataObj, setErrors)
  };

  return (
    <>
      <h1 className="text-4xl font-black text-gray-800 dark:text-white">
        Crea tu cuenta
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Crea tu cuenta llenando el formulario
      </p>
      <div className="bg-white dark:bg-neutral-700 shadow-md rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
          {errors
            ? errors.map((error, index) => {
                return <AlertError key={index}>{error}</AlertError>;
              })
            : null}
          <div className="mb-4">
            <label className="text-slate-800 dark:text-gray-300" htmlFor="name">
              Nombre:
            </label>
            <input
              id="name"
              type="text"
              className="mt-2 w-full p-3 bg-gray-100 dark:bg-neutral-600 dark:text-white dark:placeholder-gray-400"
              name="name"
              placeholder="Tu Nombre"
              ref={nameRef}
            />
          </div>
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
          {/* <div className="mb-4">
            <label
              className="text-slate-800 dark:text-gray-300"
              htmlFor="password_confirmation"
            >
              Repetir Password:
            </label>
            <input
              id="password_confirmation"
              type="password"
              className="mt-2 w-full p-3 bg-gray-100 dark:bg-neutral-600 dark:text-white dark:placeholder-gray-400"
              name="password_confirmation"
              placeholder="Repetir Password"
              ref={passwordConfirmationRef}
            />
          </div> */}

          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link
          to="/auth/login"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
        >
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </nav>
    </>
  );
}
