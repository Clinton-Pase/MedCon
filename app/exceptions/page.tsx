import { getExceptions } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import Link from "next/link";

function statusColor(status: string) {
  switch (status) {
    case "PAID":
    case "PARTIALLY_PAID":
      return "bg-green-700 text-green-50";
    case "APPROVED":
    case "PARTIALLY_APPROVED":
      return "bg-amber-700 text-amber-50";
    case "REJECTED":
      return "bg-red-700 text-red-50";
    default:
      return "bg-gray-900 text-gray-50";
  }
}

export default async function ExceptionsPage() {
  const exceptions = await getExceptions();
  const sorted = [...exceptions].sort((a, b) => b.revenueAtRisk - a.revenueAtRisk);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Exceptions</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {sorted.map((exc) => (
          <Link
            key={exc.id}
            href={`/exceptions/${exc.id}`}
            className="block bg-white p-4 rounded-lg border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-600">{exc.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(exc.status)}`}>
                {exc.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">{exc.hmo} · {exc.claimId}</p>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500">{exc.ageDays}d old</span>
              <span className="text-gray-900 font-semibold">{formatNaira(exc.revenueAtRisk)} at risk</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Exception</th>
            <th className="py-2">HMO</th>
            <th className="py-2">Claim</th>
            <th className="py-2">Amount at risk</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((exc) => (
            <tr key={exc.id} className="border-b hover:bg-gray-50">
              <td className="py-2">
                <Link href={`/exceptions/${exc.id}`} className="text-blue-600 hover:underline">
                  {exc.title}
                </Link>
              </td>
              <td className="py-2">{exc.hmo}</td>
              <td className="py-2">{exc.claimId}</td>
              <td className="py-2">{formatNaira(exc.revenueAtRisk)}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(exc.status)}`}>
                  {exc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}