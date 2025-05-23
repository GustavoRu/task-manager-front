import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// import { InflationProvider } from "./context/InflationProvider";
import { TasksManagerProvider } from "./context/TasksManagerProvider";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TasksManagerProvider>
      <div className="min-h-screen bg-zinc-800 dark:bg-zinc-800">
        <RouterProvider router={router} />
      </div>
    </TasksManagerProvider>
  </React.StrictMode>
);
