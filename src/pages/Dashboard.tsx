import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

type Row = {
  id: string;
  status: string;
  placement_type: string;
  review_notes: string | null;
  submitted_at: string | null;
  departments: { name: string } | null;
};

export default function Dashboard() {
  const { session, role } = useAuth();
  const [apps, setApps] = useState<Row[]>([]);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("applications")
      .select(
        "id,status,placement_type,review_notes,submitted_at,departments(name)",
      )
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setApps((data as Row[]) ?? []));
  }, [session]);

  return (
    <div>
      <h2>My Applications</h2>
      {role !== "student" && <Link to="/admin/applications">Go to admin</Link>}
      <Link to="/apply"> + New application</Link>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
      {apps.length === 0 && <p>No applications yet.</p>}
      {apps.map((a) => (
        <div
          key={a.id}
          style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}
        >
          <b>{a.departments?.name ?? "No department"}</b> ({a.placement_type})
          <p>
            Status: <b>{a.status.replace("_", " ")}</b>
          </p>
          {a.review_notes && <p>Feedback: {a.review_notes}</p>}
        </div>
      ))}
    </div>
  );
}
