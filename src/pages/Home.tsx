import { Link } from "react-router-dom";
import DepartmentGrid from "../components/DepartmentGrid";

const steps = [
  [
    "👤",
    "Create your account",
    "Register with your email, then fill in your institution, course and contact details.",
  ],
  [
    "📋",
    "Choose a department",
    "Pick the department you want, the placement type and your preferred start and end dates.",
  ],
  [
    "📄",
    "Upload your documents",
    "Attach your introduction letter, ID, transcript, insurance cover, CV and photo.",
  ],
  [
    "🔎",
    "Track the outcome",
    "Follow your application from submitted to reviewed, then download your placement letter.",
  ],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="badge">Attachment &amp; Internship Intake</span>
        <h1>Apply for your county attachment or internship in one place</h1>
        <p>
          Register once, choose the department that matches your course, upload
          your documents and follow your application until you receive a
          decision.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="btn">
            Start an application
          </Link>
          <a href="#requirements" className="btn btn-light">
            See what you need
          </a>
        </div>
      </section>

      <section className="section" id="how">
        <h2>How it works</h2>
        <div className="steps">
          {steps.map(([icon, title, text], i) => (
            <div key={title}>
              <span className="step-icon">{icon}</span>
              <small>STEP {i + 1}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="departments">
        <div className="section-head">
          <div>
            <h2>Departments taking students</h2>
            <p className="muted">
              Placement numbers per department are set by the Public Service
              office each intake.
            </p>
          </div>
          <Link to="/departments" className="btn btn-outline">
            View all departments
          </Link>
        </div>
        <DepartmentGrid limit={6} />
      </section>

      <section className="section" id="requirements">
        <h2>Requirements</h2>
        <div className="card">
          <p>
            Introduction letter from your institution, CV, copy of national ID,
            your latest transcript or result slip, insurance cover and a
            passport photo (PDF, JPG or PNG).
          </p>
        </div>
      </section>
    </>
  );
}
