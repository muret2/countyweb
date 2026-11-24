const LABELS: Record<string, string> = {
  draft: "Draft",
  submitted: "Submitted",
  under_review: "Under review",
  shortlisted: "Shortlisted",
  approved: "Approved",
  rejected: "Not successful",
  withdrawn: "Withdrawn",
};

export default function StatusPill({ status }: { status: string }) {
  return (
    <span className={`pill st-${status}`}>{LABELS[status] ?? status}</span>
  );
}
