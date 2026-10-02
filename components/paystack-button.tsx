"use client";

import { useState } from "react";

type PaymentStatus = "idle" | "pending" | "paid" | "failed";

export function PaystackButton({ claimId, balance }: { claimId: string; balance: number }) {
  const [status, setStatus] = useState<PaymentStatus>("idle");

  function handleRequestPayment() {
    // Later: POST /payments/patient-request, then open the returned authorization_url
    setStatus("pending");

    // Mock: simulate backend confirming payment after a few seconds
    setTimeout(() => {
      setStatus("paid");
    }, 4000);
  }

  if (balance <= 0) return null;

  return (
    <div className="bg-white p-4 rounded-lg border mt-4">
      <h2 className="font-semibold text-gray-900 mb-2">Patient Shortfall</h2>

      {status === "idle" && (
        <button
          onClick={handleRequestPayment}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
        >
          Request payment for claim {claimId}
        </button>
      )}

      {status === "pending" && (
        <p className="text-sm text-amber-700">Confirming payment...</p>
      )}

      {status === "paid" && (
        <p className="text-sm text-green-700">Payment confirmed and posted.</p>
      )}

      {status === "failed" && (
        <p className="text-sm text-red-700">Payment failed. Try again.</p>
      )}
    </div>
  );
}