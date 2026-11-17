import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Row = {
  id: string;
  status: string;
  placement_type: string;
  submitted_at: string | null;
  departments: { name: string } | null;
  profiles: { full_name: string | null; institution: string | null } | null;
};

export default function AdminApplications() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState("all");

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

  return (
    <div>
      <h2>All Applications</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        {[
          "all",
          "submitted",
          "under_review",
          "shortlisted",
          "approved",
          "rejected",
        ].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Institution</th>
            <th>Dept</th>
            <th>Type</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.profiles?.full_name}</td>
              <td>{r.profiles?.institution}</td>
              <td>{r.departments?.name}</td>
              <td>{r.placement_type}</td>
              <td>{r.status}</td>
              <td>
                <Link to={`/admin/applications/${r.id}`}>Review</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
