import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const { user, error } = useAuth({ middleware: "auth" });
  console.log("USER:", user);
  console.log("error:", error);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
