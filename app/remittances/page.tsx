import { getRemittances } from "@/lib/lib/api";
import Link from "next/link";

function statusColor(status: string) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "PROCESSING":
      return "bg-amber-100 text-amber-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function RemittancesPage() {
  const remittances = await getRemittances();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Remittances</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {remittances.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900 truncate pr-2">{r.fileName}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${statusColor(r.status)}`}>
                {r.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">{r.hmo}</p>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">{r.uploadedAt} · {r.rowCount} rows</span>
              {r.status === "COMPLETED" && (
                <Link href="/remittances/review" className="text-blue-600 hover:underline text-xs">
                  Review
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">File</th>
            <th className="py-2">HMO</th>
            <th className="py-2">Uploaded</th>
            <th className="py-2">Rows</th>
            <th className="py-2">Status</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {remittances.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{r.fileName}</td>
              <td className="py-2">{r.hmo}</td>
              <td className="py-2">{r.uploadedAt}</td>
              <td className="py-2">{r.rowCount}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(r.status)}`}>
                  {r.status}
                </span>
              </td>
              <td className="py-2">
                {r.status === "COMPLETED" && (
                  <Link href="/remittances/review" className="text-blue-600 hover:underline text-xs">
                    Review
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}