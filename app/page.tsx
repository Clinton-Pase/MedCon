import { getOverview } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";
import { getAging } from "@/lib/lib/api";
import { AgingChart } from "@/components/aging-chart";
import Link from "next/link";

export default async function Home() {
  const overview = await getOverview();
const aging = await getAging();

  const cards = [
    { label: "Submitted", value: overview.submitted },
    { label: "Approved", value: overview.approved },
    { label: "Received", value: overview.received },
    { label: "Outstanding", value: overview.outstanding },
    { label: "Rejected", value: overview.rejected },
    { label: "Recoverable", value: overview.recoverable },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Overview</h1>
 <p className="text-gray-600 mb-4">
  {overview.claimsProcessed} claims processed · {overview.reconciledAuto} reconciled automatically ·{" "}
  <Link href="/exceptions" className="font-semibold text-amber-700 hover:underline">
    {overview.needAttention} need attention
  </Link>
</p>
<div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white p-4 rounded-lg border">
            <p className="text-xs text-gray-900">{card.label}</p>
           <p className="text-lg md:text-xl font-semibold text-gray-900">{formatNaira(card.value)}</p>
          </div>
        ))}
      </div>
<AgingChart data={aging} />

    </div>
  );
}