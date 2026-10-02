const reports = [
  { name: "Reconciliation report", format: "CSV" },
  { name: "Aging report", format: "CSV" },
  { name: "Rejected claims report", format: "CSV" },
  { name: "Exception report", format: "CSV" },
  { name: "Audit activity", format: "PDF" },
];

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Reports</h1>

      <div className="bg-white rounded-lg border divide-y">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-gray-900">{r.name}</p>
              <p className="text-xs text-gray-500">{r.format}</p>
            </div>
            <button
              disabled
              title="Connects to backend in Phase 9"
              className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}