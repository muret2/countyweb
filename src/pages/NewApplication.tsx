import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { Enums, Tables } from "../lib/database.types";

export default function NewApplication() {
  const { session } = useAuth();
  const nav = useNavigate();
  const [depts, setDepts] = useState<Tables<"departments">[]>([]);
  const [departmentId, setDepartmentId] = useState("");
  const [type, setType] = useState<Enums<"placement_type">>("attachment");
  const [motivation, setMotivation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("departments")
      .select("*")
      .eq("is_open", true)
      .then(({ data }) => setDepts(data ?? []));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;
    const uid = session.user.id;

    const { data: app, error } = await supabase
      .from("applications")
      .insert({
        user_id: uid,
        department_id: departmentId,
        placement_type: type,
        motivation,
        start_date: startDate,
        end_date: endDate,
        status: "submitted",
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();
    if (error || !app) return setError(error?.message ?? "Failed");

    for (const file of files) {
      const path = `${uid}/${app.id}/${Date.now()}-${file.name}`;
      const up = await supabase.storage.from("documents").upload(path, file);
      if (up.error) {
        setError(up.error.message);
        continue;
      }
      await supabase.from("documents").insert({
        application_id: app.id,
        user_id: uid,
        doc_type: "attachment",
        file_name: file.name,
        file_path: path,
      });
    }
    nav("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Application</h2>
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Enums<"placement_type">)}
      >
        <option value="attachment">Attachment</option>
        <option value="internship">Internship</option>
      </select>
      <select
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        required
      >
        <option value="">Select department</option>
        {depts.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <textarea
        placeholder="Why do you want this placement?"
        value={motivation}
        onChange={(e) => setMotivation(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.png"
        onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
      />
      <small>Upload: introduction letter, CV, ID copy, transcript.</small>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit application</button>
    </form>
  );
}
