import React from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
  const { user, logout } = useAuth({ middleware: "none" });

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-2"
      data-twe-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <div>
          <a className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="/">
            {/* <img
              src={SavingsIcon}
              alt="Imagen app"
              // className="max-w-xs"
              style={{ height: "50px" }}
            /> */}
            <AssignmentIcon sx={{ color: "#ffff", fontSize: "40px" }} />
          </a>
        </div>

        {/* Hamburger button for mobile view */}
        <button
          className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-twe-collapse-init
          data-twe-target="#navbarSupportedContent4"
          aria-controls="navbarSupportedContent4"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Hamburger icon */}
          <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* Collapsible navbar container */}
        <div
          className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent4"
          data-twe-collapse-item
        >
          {/* Left links */}
          <ul
            className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
            data-twe-navbar-nav-ref
          >
            {/* <li
              className="my-4 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
              data-twe-nav-item-ref
            >
              <a
                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                aria-current="page"
                href="#"
                data-twe-nav-link-ref
              >
                Dashboard
              </a>
            </li> */}
          </ul>

          <div className="flex items-center">
            {user ? (
              // Si el usuario está autenticado
              <>
                <span className="me-3 text-indigo-600 dark:text-indigo-400">
                  {user.userName}
                </span>
                <Tooltip title="Cerrar Sesión">
                  <IconButton
                    onClick={logout}
                    aria-label="cerrar sesión"
                    size="small"
                    sx={{ 
                      color: "#6366f1", 
                      "&.MuiIconButton-root:hover": {
                        backgroundColor: "rgba(99, 102, 241, 0.1)" 
                      },
                      "@media (prefers-color-scheme: dark)": {
                        color: "#818cf8"
                      }
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              // Si el usuario no está autenticado
              <>
                <button
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500"
                >
                  <Link
                    to="/auth/login"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    Login
                  </Link>
                </button>
                <button
                  type="button"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  className="me-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  <Link
                    to="/auth/register"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    SIGN UP
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
