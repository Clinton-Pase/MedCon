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

      <table className="w-full text-sm border-collapse">
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