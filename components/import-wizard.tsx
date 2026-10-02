"use client";

import { useState } from "react";

const mockColumns = ["Patient Name", "Claim Ref", "Amount Billed", "HMO", "Service Date"];
const requiredFields = ["patientName", "claimRef", "amount", "hmo", "serviceDate"];

export function ImportWizard() {
  const [file, setFile] = useState<File | null>(null);
const [step, setStep] = useState<"upload" | "map" | "preview">("upload");
  const [mapping, setMapping] = useState<Record<string, string>>({});


  const mockPreviewRows = [
  { patientName: "A. Okafor", claimRef: "CLM-20458", amount: "85000", hmo: "Hygeia HMO", serviceDate: "2026-07-01", valid: true },
  { patientName: "B. Adeyemi", claimRef: "CLM-20311", amount: "120000", hmo: "AXA Mansard", serviceDate: "2026-07-05", valid: true },
  { patientName: "", claimRef: "CLM-20502", amount: "45000", hmo: "Leadway", serviceDate: "2026-07-09", valid: false, error: "Missing patient name" },
];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  }

  function handleContinue() {
    if (file) setStep("map");
  }

  function handleMappingChange(field: string, column: string) {
    setMapping((prev) => ({ ...prev, [field]: column }));
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      {step === "upload" && (
        <>
          <p className="text-sm text-gray-600 mb-3">Upload a CSV or XLSX file of claims.</p>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFileChange}
            className="block text-sm text-gray-700 mb-4"
          />
          {file && (
            <div>
              <p className="text-sm text-green-700 mb-3">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
              <button
                onClick={handleContinue}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
              >
                Continue to column mapping
              </button>
            </div>
          )}
        </>
      )}

      {step === "map" && (
        <>
          <p className="text-sm text-gray-600 mb-4">Match your files columns to MedRecon fields.</p>
          <div className="space-y-3">
            {requiredFields.map((field) => (
              <div key={field} className="flex items-center gap-3">
                <span className="w-32 text-sm text-gray-700">{field}</span>
                <select
                  onChange={(e) => handleMappingChange(field, e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm flex-1"
                >
                  <option value="">Select column</option>
                  {mockColumns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
  onClick={() => setStep("preview")}
  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
>
  Continue to preview
</button>
        </>
      )}

      {step === "preview" && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Preview: {mockPreviewRows.filter((r) => r.valid).length} valid rows,{" "}
            {mockPreviewRows.filter((r) => !r.valid).length} need fixing.
          </p>
          <table className="w-full text-sm border-collapse mb-4">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Patient</th>
                <th className="py-2">Claim Ref</th>
                <th className="py-2">Amount</th>
                <th className="py-2">HMO</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPreviewRows.map((row, i) => (
                <tr key={i} className={`border-b ${!row.valid ? "bg-red-50" : ""}`}>
                  <td className="py-2">{row.patientName || "—"}</td>
                  <td className="py-2">{row.claimRef}</td>
                  <td className="py-2">{row.amount}</td>
                  <td className="py-2">{row.hmo}</td>
                  <td className="py-2">
                    {row.valid ? (
                      <span className="text-green-700 text-xs">Valid</span>
                    ) : (
                      <span className="text-red-700 text-xs">{row.error}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
            Confirm import
          </button>
        </>
      )}
    </div>
  );
}

      
