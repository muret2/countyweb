import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NewApplication from "./pages/NewApplication";
import AdminApplications from "./pages/AdminApplications";
import AdminReview from "./pages/AdminReview";

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>County E-Recruitment Portal</h1>
      <p>Apply for attachment and internship placements.</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/apply" element={<NewApplication />} />
          </Route>

          <Route element={<ProtectedRoute staffOnly />}>
            <Route path="/admin/applications" element={<AdminApplications />} />
            <Route path="/admin/applications/:id" element={<AdminReview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
