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

      <table className="w-full text-sm border-collapse">
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