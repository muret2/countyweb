import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import StatusPill from "../components/StatusPill";

type Row = {
  id: string;
  status: string;
  placement_type: string;
  submitted_at: string | null;
  departments: { name: string } | null;
  profiles: { full_name: string | null; institution: string | null } | null;
};
type Dept = { id: string; name: string; slots: number; is_open: boolean };

const CARDS = [
  ["submitted", "Awaiting review", "📥"],
  ["under_review", "Under review", "🔍"],
  ["shortlisted", "Shortlisted", "⭐"],
  ["approved", "Approved", "✅"],
  ["rejected", "Not successful", "✖"],
] as const;

const DAY = 86400000;

export default function AdminHome() {
  const { session, role } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [depts, setDepts] = useState<Dept[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase
        .from("applications")
        .select(
          "id,status,placement_type,submitted_at,departments(name),profiles(full_name,institution)",
        )
        .neq("status", "draft")
        .order("submitted_at", { ascending: false }),
      supabase
        .from("departments")
        .select("id,name,slots,is_open")
        .order("name"),
    ]).then(([a, d]) => {
      setRows((a.data as unknown as Row[]) ?? []);
      setDepts((d.data as Dept[]) ?? []);
      setLoading(false);
    });
  }, []);

  const count = (s: string) => rows.filter((r) => r.status === s).length;
  const now = Date.now();
  const thisWeek = rows.filter(
    (r) => r.submitted_at && now - +new Date(r.submitted_at) < 7 * DAY,
  ).length;
  const decided = count("approved") + count("rejected");
  const rate = decided ? Math.round((count("approved") / decided) * 100) : 0;
  const attention = rows.filter(
    (r) =>
      r.status === "submitted" &&
      r.submitted_at &&
      now - +new Date(r.submitted_at) > 3 * DAY,
  );
  const attachment = rows.filter(
    (r) => r.placement_type === "attachment",
  ).length;
  const internship = rows.length - attachment;

  const deptRows = useMemo(
    () =>
      depts.map((d) => {
        const mine = rows.filter((r) => r.departments?.name === d.name);
        const approved = mine.filter((r) => r.status === "approved").length;
        return { ...d, total: mine.length, approved };
      }),
    [depts, rows],
  );

  const name =
    (session?.user.user_metadata?.full_name as string) || session?.user.email;
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="section admin-wrap">
      <div className="admin-head">
        <div>
          <h2>Welcome, {name}</h2>
          <p className="muted">
            {role === "admin" ? "Administrator" : "Officer"} · {today}
          </p>
        </div>
        <Link to="/admin/applications" className="btn">
          View all applications
        </Link>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <small>Total received</small>
          <b>{loading ? "–" : rows.length}</b>
        </div>
        <div className="kpi">
          <small>Last 7 days</small>
          <b>{loading ? "–" : thisWeek}</b>
        </div>
        <div className="kpi">
          <small>Approval rate</small>
          <b>{loading ? "–" : `${rate}%`}</b>
        </div>
        <div className="kpi">
          <small>Attachment / Internship</small>
          <b>
            {attachment} / {internship}
          </b>
        </div>
      </div>

      <div className="stat-grid">
        {CARDS.map(([s, label, icon]) => (
          <Link
            to="/admin/applications"
            key={s}
            className={`stat st-card-${s}`}
          >
            <span className="stat-icon">{icon}</span>
            <b>{loading ? "–" : count(s)}</b>
            <small>{label}</small>
          </Link>
        ))}
      </div>

      {attention.length > 0 && (
        <div className="panel alert-panel">
          <h3>⚠ Needs attention ({attention.length})</h3>
          <p className="muted">
            Submitted more than 3 days ago and not yet picked up.
          </p>
          {attention.slice(0, 5).map((r) => (
            <Link
              key={r.id}
              to={`/admin/applications/${r.id}`}
              className="recent"
            >
              <span className="avatar">
                {(r.profiles?.full_name ?? "?")[0]}
              </span>
              <span className="recent-info">
                <b>{r.profiles?.full_name ?? "Unknown"}</b>
                <small>
                  {r.departments?.name ?? "No department"} ·{" "}
                  {new Date(r.submitted_at!).toLocaleDateString()}
                </small>
              </span>
              <span className="btn btn-outline">Review</span>
            </Link>
          ))}
        </div>
      )}

      <div className="admin-cols">
        <div className="panel">
          <h3>Department capacity</h3>
          {deptRows.map((d) => (
            <div key={d.id} className="bar-row">
              <div className="bar-label">
                <span>
                  {d.name} {!d.is_open && <em>(closed)</em>}
                </span>
                <b>
                  {d.approved}/{d.slots} filled · {d.total} applied
                </b>
              </div>
              <div className="bar">
                <i
                  style={{
                    width: `${Math.min(100, d.slots ? (d.approved / d.slots) * 100 : 0)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>Recent applications</h3>
          {rows.slice(0, 8).map((r) => (
            <Link
              key={r.id}
              to={`/admin/applications/${r.id}`}
              className="recent"
            >
              <span className="avatar">
                {(r.profiles?.full_name ?? "?")[0]}
              </span>
              <span className="recent-info">
                <b>{r.profiles?.full_name ?? "Unknown"}</b>
                <small>
                  {r.departments?.name ?? "No department"} · {r.placement_type}
                </small>
              </span>
              <StatusPill status={r.status} />
            </Link>
          ))}
          {rows.length === 0 && !loading && (
            <p className="muted">Nothing submitted yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
