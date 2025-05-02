import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import Notification from "../components/Notification";

export default function Layout() {
  const { user, loading } = useAuth({ middleware: "auth" });
  
  return (
    <div>
      <Navbar />
      <Outlet />
      <Notification />
    </div>
  );
}
