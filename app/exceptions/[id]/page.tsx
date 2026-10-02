import { getException } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import { ExceptionActions } from "@/components/exception-action";   

export default async function ExceptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exc = await getException(id);

  if (!exc) {
    return <h1 className="text-2xl font-bold">Exception not found</h1>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{exc.title}</h1>
      <p className="text-gray-900 mb-4">{exc.hmo} — Claim {exc.claimId}</p>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-900">Submitted</p>
          <p className="font-semibold">{formatNaira(exc.submitted)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-900">Approved</p>
          <p className="font-semibold">{formatNaira(exc.approved)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-900">Paid</p>
          <p className="font-semibold">{formatNaira(exc.paid)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-900">Variance</p>
          <p className="font-semibold">{formatNaira(exc.variance)}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
  <h2 className="font-semibold mb-2">AI Explanation</h2>

  {exc.explanation.status === "unavailable" ? (
    <p className="text-gray-900 text-sm">
      AI explanation unavailable. Raw reason: {exc.rawReason ?? "—"}
      {exc.normalizedReason && ` (${exc.normalizedReason})`}
    </p>
  ) : (
    <div>
      <span className="inline-block mb-2 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
        Suggested · {Math.round((exc.explanation.confidence ?? 0) * 100)}% confidence
      </span>
      <p className="text-sm text-gray-900 mb-3">{exc.explanation.text}</p>

      <p className="text-xs text-gray-900 uppercase mb-1">Evidence</p>
      <ul className="space-y-1">
        {exc.explanation.evidence?.map((ev, i) => (
          <li key={i} className="text-sm text-gray-900 border-l-2 border-gray-200 pl-2">
            <span className="font-medium">{ev.label}:</span> {ev.value}
            <span className="text-gray-900"> ({ev.source}{ev.page ? `, p.${ev.page}` : ""})</span>
          </li>
        ))}
      </ul>
    </div>
  )}
  
</div>
<div className="bg-white p-4 rounded-lg border mt-4">
  <h2 className="font-semibold mb-2">Suggested Next Step</h2>
  <p className="text-sm text-gray-900">{exc.suggestedNextStep}</p>
</div>

<div className="bg-white p-4 rounded-lg border mt-4">
  <h2 className="font-semibold mb-2">Activity Timeline</h2>
  <ul className="space-y-2">
    {exc.timeline.map((item, i) => (
      <li key={i} className="text-sm text-gray-900">
        <span className="text-gray-900">{new Date(item.at).toLocaleString()}</span>
        {" — "}
        <span className="font-medium">{item.actor}</span>: {item.action}
      </li>
    ))}
  </ul>
</div>
<ExceptionActions id={exc.id} />
    </div>
  );
}