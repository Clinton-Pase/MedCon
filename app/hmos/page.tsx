import { getHmos } from "@/lib/lib/api";

export default async function HmosPage() {
  const hmos = await getHmos();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">HMOs</h1>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-3">
        {hmos.map((h) => (
          <div key={h.id} className="bg-white p-4 rounded-lg border">
            <p className="font-medium text-gray-900 mb-2">{h.name}</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{h.plans} plans</span>
              <span>{h.activeClaims} active claims</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full text-sm border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">HMO</th>
            <th className="py-2">Plans</th>
            <th className="py-2">Active claims</th>
          </tr>
        </thead>
        <tbody>
          {hmos.map((h) => (
            <tr key={h.id} className="border-b">
              <td className="py-2">{h.name}</td>
              <td className="py-2">{h.plans}</td>
              <td className="py-2">{h.activeClaims}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}