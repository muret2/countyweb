import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Register() {
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return setError(error.message);
    setFullName("");
    setEmail("");
    setPassword("");
    nav("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Create account</h2>
      <input
        placeholder="Full name"
        value={fullName}
        autoComplete="off"
        onChange={(e) => setFullName(e.target.value)}
        required
      />
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
          placeholder="Password (min 6)"
          value={password}
          autoComplete="new-password"
          minLength={6}
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
      <button type="submit">Register</button>
      <p>
        Have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
