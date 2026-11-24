import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import StatusPill from "../components/StatusPill";

type Row = {
  id: string;
  status: string;
  placement_type: string;
  submitted_at: string | null;
  departments: { name: string } | null;
  profiles: { full_name: string | null; institution: string | null } | null;
};

const STATUSES = [
  "all",
  "submitted",
  "under_review",
  "shortlisted",
  "approved",
  "rejected",
];

export default function AdminApplications() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let q = supabase
      .from("applications")
      .select(
        "id,status,placement_type,submitted_at,departments(name),profiles(full_name,institution)",
      )
      .neq("status", "draft")
      .order("submitted_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter as never);
    q.then(({ data }) => setRows((data as unknown as Row[]) ?? []));
  }, [filter]);

  const shown = rows.filter((r) =>
    `${r.profiles?.full_name} ${r.profiles?.institution} ${r.departments?.name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <section className="section admin-wrap">
      <div className="admin-head">
        <h2>All applications</h2>
        <Link to="/admin" className="btn btn-outline">
          ← Admin home
        </Link>
      </div>
      <div className="toolbar">
        <input
          placeholder="Search name, institution or department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="chips">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={filter === s ? "chip on" : "chip"}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Institution</th>
              <th>Department</th>
              <th>Type</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.id}>
                <td>
                  <b>{r.profiles?.full_name}</b>
                </td>
                <td>{r.profiles?.institution}</td>
                <td>{r.departments?.name}</td>
                <td>{r.placement_type}</td>
                <td>
                  <StatusPill status={r.status} />
                </td>
                <td>
                  <Link to={`/admin/applications/${r.id}`}>Review →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && (
          <p className="muted" style={{ padding: 16 }}>
            No applications found.
          </p>
        )}
      </div>
    </section>
  );
}
