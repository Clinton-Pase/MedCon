import { getClaim } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import { PaystackButton } from "@/components/paystack-button";

export default async function ClaimDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const claim = await getClaim(id);

  if (!claim) {
    return <h1 className="text-2xl font-bold text-gray-900">Claim not found</h1>;
  }

  const stats = [
    { label: "Submitted", value: claim.submitted },
    { label: "Approved", value: claim.approved },
    { label: "Paid", value: claim.paid },
    { label: "Balance", value: claim.balance },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{claim.id}</h1>
      <p className="text-gray-600 mb-4">
        {claim.patientName} · {claim.hmo} · {claim.status}
      </p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-4 rounded-lg border">
            <p className="text-xs text-gray-500">{s.label}</p>
            <p className="font-semibold text-gray-900">{formatNaira(s.value)}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h2 className="font-semibold text-gray-900 mb-2">Payment history</h2>
        {claim.allocations.length === 0 ? (
          <p className="text-sm text-gray-500">No payments yet.</p>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Source</th>
                <th className="py-2">Reference</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {claim.allocations.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="py-2">{a.date}</td>
                  <td className="py-2">{a.source === "HMO" ? "HMO payment" : "Patient (Paystack)"}</td>
                  <td className="py-2">{a.reference}</td>
                  <td className="py-2">{formatNaira(a.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <PaystackButton claimId={claim.id} balance={claim.balance} />
    </div>
  );
}