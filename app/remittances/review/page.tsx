"use client";

import { useState } from "react";
import { extractionJobCompleted } from "@/mock-data/mock-data";

function cellStyle(confidence: number) {
  return confidence < 0.8
    ? "bg-amber-50 border border-amber-300"
    : "border border-transparent";
}

export default function RemittanceReviewPage() {
  const job = extractionJobCompleted;
  const row = job.rows?.[0];

  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.entries(row?.cells ?? {}).map(([field, cell]) => [field, cell.value])
    )
  );
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});

  function handleChange(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleConfirm(field: string) {
    setConfirmed((prev) => ({ ...prev, [field]: true }));
  }

  const lowConfidenceFields = Object.entries(row?.cells ?? {})
    .filter(([, cell]) => cell.confidence < 0.8)
    .map(([field]) => field);

  const allConfirmed = lowConfidenceFields.every((field) => confirmed[field]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Review Extracted Remittance</h1>
      <p className="text-sm text-gray-500 mb-4">Model: {job.modelVersion}</p>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border h-[300px] md:h-[500px] flex items-center justify-center">
          <p className="text-gray-400 text-sm">Document image goes here</p>
        </div>

        <div className="bg-white p-4 rounded-lg border h-[300px] md:h-[500px] flex flex-col">
          <h2 className="font-semibold text-gray-900 mb-3">Extracted fields</h2>

          <div className="space-y-3 flex-1">
            {row && Object.entries(row.cells).map(([field, cell]) => {
              const needsReview = cell.confidence < 0.8;
              return (
                <div key={field} className={`p-2 rounded ${cellStyle(cell.confidence)}`}>
                  <p className="text-xs text-gray-500">{field}</p>

                  {needsReview ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={values[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        className="text-sm border rounded px-2 py-1 flex-1"
                      />
                      {confirmed[field] ? (
                        <span className="text-xs text-green-700">Confirmed</span>
                      ) : (
                        <button
                          onClick={() => handleConfirm(field)}
                          className="text-xs px-2 py-1 rounded bg-amber-600 text-white"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{values[field]}</p>
                  )}

                  <p className="text-xs text-gray-400">
                    {Math.round(cell.confidence * 100)}% confidence
                  </p>
                </div>
              );
            })}
          </div>

          <button
            disabled={!allConfirmed}
            className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
              allConfirmed
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm and send to reconciliation
          </button>
        </div>
      </div>
    </div>
  );
}