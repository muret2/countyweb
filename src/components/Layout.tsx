import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function Layout() {
  const { session, role } = useAuth();
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <span className="logo">🏛</span>
          <span>
            <b>County Attachment &amp; Internship Portal</b>
            <small>Department of Public Service</small>
          </span>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/departments">Departments</Link>
          <a href="/#how">How it works</a>
          <a href="/#requirements">Requirements</a>
          <a href="/#contact">Contact</a>
        </nav>
        <div className="header-actions">
          {session ? (
            <>
              <Link
                to={role === "student" ? "/dashboard" : "/admin/applications"}
              >
                {role === "student" ? "My applications" : "Admin"}
              </Link>
              <button
                className="link-btn"
                onClick={() => supabase.auth.signOut()}
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="btn">
                Apply now
              </Link>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer id="contact">
        © County Government. Serving people, building together.
      </footer>
    </>
  );
}
