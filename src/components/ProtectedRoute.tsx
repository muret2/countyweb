import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  staffOnly = false,
  studentOnly = false,
}: {
  staffOnly?: boolean;
  studentOnly?: boolean;
}) {
  const { session, role, loading } = useAuth();
  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;
  if (!session) return <Navigate to="/login" replace />;
  if (staffOnly && role === "student")
    return <Navigate to="/dashboard" replace />;
  if (studentOnly && role && role !== "student")
    return <Navigate to="/admin" replace />;
  return <Outlet />;
}
