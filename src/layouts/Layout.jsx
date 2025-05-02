import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";

export default function Layout() {
  const { user, loading } = useAuth({ middleware: "auth" });
  
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
