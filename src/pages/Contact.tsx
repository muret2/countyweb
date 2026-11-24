export default function Contact() {
  return (
    <section className="section">
      <h2>Contact us</h2>
      <p className="muted">
        Questions about your application? Reach the Department of Public
        Service.
      </p>
      <div className="steps">
        <div>
          <span className="step-icon">📍</span>
          <h3>Visit</h3>
          <p>County GOK office, Public Service Office</p>
        </div>
        <div>
          <span className="step-icon">📞</span>
          <h3>Call</h3>
          <p>+254 700 000 000</p>
        </div>
        <div>
          <span className="step-icon">✉️</span>
          <h3>Email</h3>
          <p>attachments@county.go.ke</p>
        </div>
        <div>
          <span className="step-icon">🕗</span>
          <h3>Hours</h3>
          <p>Mon–Fri, 8:00 am – 5:00 pm</p>
        </div>
      </div>
    </section>
  );
}
