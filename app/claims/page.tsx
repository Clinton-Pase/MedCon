import { getClaims } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import Link from "next/link";

function statusColor(status: string) {
  switch (status) {
    case "PAID":
    case "PARTIALLY_PAID":
      return "bg-green-100 text-green-700";
    case "APPROVED":
    case "PARTIALLY_APPROVED":
      return "bg-amber-100 text-amber-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default async function ClaimsPage() {
  const claims = await getClaims();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Claims</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {claims.map((claim) => (
          <Link
            key={claim.id}
            href={`/claims/${claim.id}`}
            className="block bg-white p-4 rounded-lg border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-600">{claim.id}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(claim.status)}`}>
                {claim.status}
              </span>
            </div>
            <p className="text-sm text-gray-700">{claim.patientName}</p>
            <p className="text-xs text-gray-500 mb-2">{claim.hmo}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Submitted: {formatNaira(claim.submitted)}</span>
              <span className="text-gray-900 font-medium">Paid: {formatNaira(claim.paid)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Claim</th>
            <th className="py-2">Patient</th>
            <th className="py-2">HMO</th>
            <th className="py-2">Submitted</th>
            <th className="py-2">Paid</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim.id} className="border-b hover:bg-gray-50">
              <td className="py-2">
                <Link href={`/claims/${claim.id}`} className="text-blue-600 hover:underline">
                  {claim.id}
                </Link>
              </td>
              <td className="py-2">{claim.patientName}</td>
              <td className="py-2">{claim.hmo}</td>
              <td className="py-2">{formatNaira(claim.submitted)}</td>
              <td className="py-2">{formatNaira(claim.paid)}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(claim.status)}`}>
                  {claim.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}