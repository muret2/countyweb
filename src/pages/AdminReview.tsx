import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import type { Enums, Tables } from "../lib/database.types";

export default function AdminReview() {
  const { id } = useParams();
  const { session } = useAuth();
  const [app, setApp] = useState<Tables<"applications"> | null>(null);
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [docs, setDocs] = useState<(Tables<"documents"> & { url?: string })[]>(
    [],
  );
  const [status, setStatus] =
    useState<Enums<"application_status">>("under_review");
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data: a } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id!)
        .single();
      if (!a) return;
      setApp(a);
      setStatus(a.status);
      setNotes(a.review_notes ?? "");
      const { data: p } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", a.user_id)
        .single();
      setProfile(p);
      const { data: d } = await supabase
        .from("documents")
        .select("*")
        .eq("application_id", a.id);
      const withUrls = await Promise.all(
        (d ?? []).map(async (doc) => {
          const { data } = await supabase.storage
            .from("documents")
            .createSignedUrl(doc.file_path, 3600);
          return { ...doc, url: data?.signedUrl };
        }),
      );
      setDocs(withUrls);
    })();
  }, [id]);

  async function save() {
    const { error } = await supabase
      .from("applications")
      .update({
        status,
        review_notes: notes,
        reviewed_by: session!.user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id!);
    setMsg(
      error ? error.message : "Saved. The applicant can now see this feedback.",
    );
  }

  if (!app) return <p>Loading...</p>;
  return (
    <div>
      <h2>{profile?.full_name}</h2>
      <p>
        {profile?.institution} | {profile?.course} | Reg: {profile?.reg_number}{" "}
        | Year: {profile?.year_of_study}
      </p>
      <p>
        Phone: {profile?.phone} | ID: {profile?.national_id}
      </p>
      <h3>Motivation</h3>
      <p>{app.motivation}</p>
      <p>
        {app.start_date} to {app.end_date}
      </p>
      <h3>Documents</h3>
      <ul>
        {docs.map((d) => (
          <li key={d.id}>
            <a href={d.url} target="_blank" rel="noreferrer">
              {d.file_name}
            </a>
          </li>
        ))}
      </ul>
      <h3>Decision</h3>
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as Enums<"application_status">)
        }
      >
        {["under_review", "shortlisted", "approved", "rejected"].map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      <textarea
        placeholder="Feedback to applicant"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={save}>Save decision</button>
      <p>{msg}</p>
    </div>
  );
}
