import { getExceptions } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import Link from "next/link";

export default async function ExceptionsPage() {
 

  function statusColor(status: string) {
  switch (status) {
    case "PAID":
    case "PARTIALLY_PAID":
      return "bg-green-700 text-green-50  cursor-pointer";
    case "APPROVED":
    case "PARTIALLY_APPROVED":
      return "bg-amber-700 text-amber-50 cursor-pointer";
    case "REJECTED":
      return "bg-red-700 text-red-50 cursor-pointer";
    default:
      return "bg-gray-900 text-gray-50 cursor-pointer";
  }
}

const exceptions = await getExceptions();

const sorted = [...exceptions].sort((a, b) => b.revenueAtRisk - a.revenueAtRisk);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Exceptions</h1>
      <table className="w-full text-sm border-collapse cursor-pointer">
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
        <tr key={exc.id} className="border-b hover:bg-gray-50 cursor-pointer">
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