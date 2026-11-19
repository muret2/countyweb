import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Departments from "./pages/Departments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";
import AdminApplications from "./pages/AdminApplications";
import AdminReview from "./pages/AdminReview";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/apply" element={<NewApplication />} />
            </Route>

            <Route element={<ProtectedRoute staffOnly />}>
              <Route
                path="/admin/applications"
                element={<AdminApplications />}
              />
              <Route path="/admin/applications/:id" element={<AdminReview />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
