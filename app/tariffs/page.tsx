import { getTariffs } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";

export default async function TariffsPage() {
  const tariffs = await getTariffs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Tariffs</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {tariffs.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-900">{t.service}</span>
              <span className="font-semibold text-gray-900">{formatNaira(t.amount)}</span>
            </div>
            <p className="text-sm text-gray-600">{t.hmo}</p>
            <p className="text-xs text-gray-500">Effective {t.effectiveFrom}</p>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">HMO</th>
            <th className="py-2">Service</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Effective from</th>
          </tr>
        </thead>
        <tbody>
          {tariffs.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="py-2">{t.hmo}</td>
              <td className="py-2">{t.service}</td>
              <td className="py-2">{formatNaira(t.amount)}</td>
              <td className="py-2">{t.effectiveFrom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}