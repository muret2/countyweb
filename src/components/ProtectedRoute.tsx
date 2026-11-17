import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  staffOnly = false,
}: {
  staffOnly?: boolean;
}) {
  const { session, role, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!session) return <Navigate to="/login" replace />;
  if (staffOnly && role === "student")
    return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
