import { Link } from "react-router-dom";

const docs = [
  "Introduction letter from your institution",
  "Curriculum Vitae (CV)",
  "Copy of national ID",
  "Latest transcript or result slip",
  "Insurance cover",
  "Passport-size photo",
];

export default function Requirements() {
  return (
    <section className="section">
      <h2>Requirements</h2>
      <p className="muted">
        Have these documents ready before you start. Accepted formats: PDF, JPG
        or PNG.
      </p>
      <div className="card">
        <ul className="req-list">
          {docs.map((d) => (
            <li key={d}>✔ {d}</li>
          ))}
        </ul>
      </div>
      <p style={{ marginTop: 20 }}>
        <Link to="/register" className="btn">
          Start an application
        </Link>
      </p>
    </section>
  );
}
