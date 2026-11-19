import DepartmentGrid from "../components/DepartmentGrid";

export default function Departments() {
  return (
    <section className="section">
      <h2>Departments</h2>
      <p className="muted">
        Placement numbers are set by the Department of Public Service at the
        start of each intake. Apply to the department that matches your course.
      </p>
      <DepartmentGrid />
    </section>
  );
}
