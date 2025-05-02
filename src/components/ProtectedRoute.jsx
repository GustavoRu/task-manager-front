import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth({ middleware: "auth" });

  // Si está cargando, muestra un estado de carga
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  // Si no hay usuario después de cargar, redirigir a login
  if (!user && !loading) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Si hay usuario, mostrar los componentes protegidos
  return children;
} 