type Status = "pending" | "signed" | "expired" | "rejected";

const styles: Record<Status, string> = {
  pending:  "bg-amber-50  text-amber-800  border-amber-200",
  signed:   "bg-green-50  text-green-800  border-green-200",
  expired:  "bg-gray-50   text-gray-600   border-gray-200",
  rejected: "bg-red-50    text-red-800    border-red-200",
};

const labels: Record<Status, string> = {
  pending:  "Awaiting signature",
  signed:   "Signed",
  expired:  "Expired",
  rejected: "Rejected",
};

export function Badge({ status }: { status: Status }) {
  console.log(status)
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}