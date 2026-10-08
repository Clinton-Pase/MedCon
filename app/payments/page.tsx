import { getPayments } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import Link from "next/link";

function sourceLabel(source: string) {
  return source === "HMO" ? "HMO payment" : "Patient (Paystack)";
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Payments</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {payments.map((p) => (
          <Link
            key={p.id}
            href={`/claims/${p.claimId}`}
            className="block bg-white p-4 rounded-lg border"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-blue-600">{p.claimId}</span>
              <span className="font-semibold text-gray-900">{formatNaira(p.amount)}</span>
            </div>
            <p className="text-sm text-gray-700">{sourceLabel(p.source)}</p>
            <p className="text-xs text-gray-500">{p.date} · {p.reference}</p>
          </Link>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Date</th>
            <th className="py-2">Claim</th>
            <th className="py-2">Source</th>
            <th className="py-2">Reference</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{p.date}</td>
              <td className="py-2">
                <Link href={`/claims/${p.claimId}`} className="text-blue-600 hover:underline">
                  {p.claimId}
                </Link>
              </td>
              <td className="py-2">{sourceLabel(p.source)}</td>
              <td className="py-2">{p.reference}</td>
              <td className="py-2">{formatNaira(p.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}