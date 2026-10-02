import { getTariffs } from "@/lib/lib/api";
import { formatNaira } from "@/mock-data/mock-data";

export default async function TariffsPage() {
  const tariffs = await getTariffs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Tariffs</h1>

      <table className="w-full text-sm border-collapse">
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