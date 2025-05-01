import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, error } = useAuth({ middleware: "auth" });

  if (error) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
} 