"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function AgingChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-4 rounded-lg border mt-6">
      <h2 className="font-semibold text-gray-900 mb-4">Receivables Aging by HMO</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="hmo" />
          <YAxis />
          <Tooltip formatter={(value: number) => `₦${(value / 100).toLocaleString()}`} />
          <Legend />
          <Bar dataKey="d0_30" stackId="a" fill="#22c55e" name="0-30 days" />
          <Bar dataKey="d31_60" stackId="a" fill="#facc15" name="31-60 days" />
          <Bar dataKey="d61_90" stackId="a" fill="#f97316" name="61-90 days" />
          <Bar dataKey="d90plus" stackId="a" fill="#ef4444" name="90+ days" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}