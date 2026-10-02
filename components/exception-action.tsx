"use client";

import { useState } from "react";

export function ExceptionActions({ id }: { id: string }) {
  const [status, setStatus] = useState<string | null>(null);

  function handleAction(action: string) {
    // Later: call the real API here, e.g. POST /exceptions/{id}/resolve
    console.log(`${action} on ${id}`);
    setStatus(`${action} recorded`);
  }

  return (
    <div className="bg-white p-4 rounded-lg border mt-4">
      <h2 className="font-semibold mb-3">Actions</h2>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => handleAction("Confirmed")}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
        >
          Confirm match
        </button>
        <button
          onClick={() => handleAction("Rejected")}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700"
        >
          Reject
        </button>
        <button
          onClick={() => handleAction("Resolved")}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        >
          Resolve
        </button>
        <button
          onClick={() => handleAction("Assigned to me")}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Assign to me
        </button>
      </div>
      {status && <p className="text-sm text-gray-500 mt-2">{status}</p>}
    </div>
  );
}