import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) return setError(error?.message ?? "Login failed");

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);
    const isStaff = (roles ?? []).some(
      (r) => r.role === "admin" || r.role === "officer",
    );

    setEmail("");
    setPassword("");
    nav(isStaff ? "/admin" : "/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="pw-wrap">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="pw-toggle"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "🙈" : "👁"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
