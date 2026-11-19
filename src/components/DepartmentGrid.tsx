import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { Tables } from "../lib/db";

export default function DepartmentGrid({ limit }: { limit?: number }) {
  const [depts, setDepts] = useState<Tables<"departments">[]>([]);

  useEffect(() => {
    let q = supabase.from("departments").select("*").order("name");
    if (limit) q = q.limit(limit);
    q.then(({ data }) => setDepts(data ?? []));
  }, [limit]);

  return (
    <div className="dept-grid">
      {depts.map((d) => (
        <Link to="/apply" key={d.id} className="dept-card">
          <div className="dept-top">
            <h3>{d.name}</h3>
            <span className="dept-icon">👥</span>
          </div>
          <p>{d.description}</p>
          <div className="dept-foot">
            <span>{d.slots} places this intake</span>
            <span className={d.is_open ? "pill pill-open" : "pill pill-closed"}>
              {d.is_open ? "Open" : "Closed"}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
