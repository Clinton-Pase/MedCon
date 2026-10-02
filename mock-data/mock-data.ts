// MedRecon mock data + types
// Put this in /mock-data/index.ts. Build every screen from it first,
// then swap for real API calls later (keep all fetching in one api.ts file).
//
// MONEY: all amounts are in KOBO (integer). 1 naira = 100 kobo.
// Never use floats for money. Format for display with formatNaira().

export const formatNaira = (kobo: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(kobo / 100);

// ---------- TYPES (agree on these with your teammates) ----------

export type ExceptionCode =
  | "E02" | "E03" | "E04" | "E05" | "E06" | "E11" | "E13"; // subset of the PRD list

export type ClaimStatus =
  | "SUBMITTED" | "APPROVED" | "PARTIALLY_APPROVED" | "PAID"
  | "PARTIALLY_PAID" | "REJECTED" | "UNMATCHED";

export interface Evidence {
  label: string;            // e.g. "Tariff for Malaria test (2026-01)"
  value: string;            // the actual value seen in the source
  source: "remittance" | "tariff" | "authorisation" | "claim";
  page?: number;            // for PDFs
}

export interface AIExplanation {
  status: "ok" | "unavailable";     // AI engineer confirmed: check this, never assume null
  text?: string;                    // present when status is "ok"
  confidence?: number;              // 0 to 1
  modelVersion?: string;
  evidence?: Evidence[];
  kind?: "observed" | "inferred";   // PRD: separate facts from interpretation
}

export interface ActivityItem {
  at: string;               // ISO date
  actor: string;            // "system" or a user name
  action: string;
}

export interface ExceptionItem {
  id: string;
  code: ExceptionCode;
  title: string;
  hmo: string;
  claimId: string;
  patientName: string;      // minimal identity only
  submitted: number;        // kobo
  approved: number;
  paid: number;
  variance: number;         // submitted - paid
  revenueAtRisk: number;
  ageDays: number;
  confidence: number;       // match/extraction confidence 0 to 1
  status: ClaimStatus;
  owner: string | null;
  rawReason: string | null;        // exactly what the HMO wrote
  normalizedReason: string | null; // AI/system cleaned category
  suggestedNextStep: string;
  explanation: AIExplanation; // check explanation.status, not truthiness
  timeline: ActivityItem[];
}

// ---------- OVERVIEW ----------

export const overview = {
  claimsProcessed: 100,
  reconciledAuto: 82,
  needAttention: 18,
  submitted: 1284000000,     // NGN 12,840,000
  approved: 1150000000,
  received: 1092000000,
  outstanding: 192000000,
  rejected: 98000000,
  recoverable: 61000000,
};

export const aging = [
  { hmo: "Hygeia HMO",  d0_30: 42000000, d31_60: 31000000, d61_90: 12000000, d90plus: 5000000 },
  { hmo: "AXA Mansard", d0_30: 28000000, d31_60: 19000000, d61_90: 22000000, d90plus: 9000000 },
  { hmo: "Leadway",     d0_30: 15000000, d31_60: 8000000,  d61_90: 3000000,  d90plus: 0 },
];

// ---------- EXCEPTIONS ----------

export const exceptions: ExceptionItem[] = [
  {
    id: "EXC-1001", code: "E05", title: "Tariff discrepancy",
    hmo: "Hygeia HMO", claimId: "CLM-20458", patientName: "A. Okafor",
    submitted: 8500000, approved: 6000000, paid: 6000000, variance: 2500000,
    revenueAtRisk: 2500000, ageDays: 47, confidence: 0.97, status: "PARTIALLY_PAID",
    owner: null,
    rawReason: "Amt above agreed tariff",
    normalizedReason: "Tariff mismatch",
    suggestedNextStep: "Compare against tariff v2026-01 and raise a dispute if the tariff is correct.",
    explanation: {
      status: "ok",
      text: "The hospital billed ₦85,000 for a malaria panel. The tariff on file for this plan is ₦60,000, which matches the amount the HMO approved.",
      confidence: 0.93, modelVersion: "explain-v0.3", kind: "inferred",
      evidence: [
        { label: "Tariff: Malaria panel", value: "₦60,000", source: "tariff" },
        { label: "Remittance row 14", value: "Approved ₦60,000", source: "remittance", page: 2 },
        { label: "Claim line", value: "Billed ₦85,000", source: "claim" },
      ],
    },
    timeline: [
      { at: "2026-08-07T09:12:00Z", actor: "system", action: "Claim matched to remittance row (L1, 100%)" },
      { at: "2026-08-07T09:12:02Z", actor: "system", action: "Exception E05 created" },
    ],
  },
  {
    id: "EXC-1002", code: "E02", title: "Approved claim unpaid",
    hmo: "AXA Mansard", claimId: "CLM-20311", patientName: "B. Adeyemi",
    submitted: 12000000, approved: 12000000, paid: 0, variance: 12000000,
    revenueAtRisk: 12000000, ageDays: 78, confidence: 1.0, status: "APPROVED",
    owner: "Chioma", rawReason: null, normalizedReason: null,
    suggestedNextStep: "Follow up with AXA Mansard finance on payment date.",
    explanation: {
      status: "ok",
      text: "This claim was approved in full 78 days ago but no payment has been matched to it.",
      confidence: 0.99, modelVersion: "explain-v0.3", kind: "observed",
      evidence: [{ label: "Approval date", value: "2026-07-07", source: "remittance", page: 1 }],
    },
    timeline: [{ at: "2026-07-07T10:00:00Z", actor: "system", action: "Claim approved by HMO" }],
  },
  {
    id: "EXC-1003", code: "E04", title: "Rejected claim",
    hmo: "Leadway", claimId: "CLM-20502", patientName: "C. Nwosu",
    submitted: 4500000, approved: 0, paid: 0, variance: 4500000,
    revenueAtRisk: 4500000, ageDays: 22, confidence: 0.91, status: "REJECTED",
    owner: null,
    rawReason: "No auth on file for proc.",
    normalizedReason: "Missing authorisation",
    suggestedNextStep: "Check if pre-authorisation exists, then resubmit with the code.",
    explanation: { status: "unavailable" }, // AI down: UI must show raw + normalized reason only
    timeline: [{ at: "2026-09-01T08:30:00Z", actor: "system", action: "Claim rejected by HMO" }],
  },
  {
    id: "EXC-1004", code: "E11", title: "Payment unmatched",
    hmo: "Hygeia HMO", claimId: "-", patientName: "-",
    submitted: 0, approved: 0, paid: 3400000, variance: 0,
    revenueAtRisk: 3400000, ageDays: 5, confidence: 0.62, status: "UNMATCHED",
    owner: null, rawReason: null, normalizedReason: null,
    suggestedNextStep: "Review suggested claim matches below 95% confidence and confirm one.",
    explanation: {
      status: "ok",
      text: "A ₦34,000 payment could belong to CLM-20470 or CLM-20471. Neither is above the auto-match threshold.",
      confidence: 0.62, modelVersion: "match-v0.2", kind: "inferred",
      evidence: [{ label: "Bank narration", value: "HYGEIA/OKONKWO/AUG", source: "remittance" }],
    },
    timeline: [{ at: "2026-09-18T12:00:00Z", actor: "system", action: "Payment imported, no confident match" }],
  },
];

// ---------- CLAIM DETAIL (payment history is additive) ----------

export const claimDetail = {
  id: "CLM-20458",
  hmo: "Hygeia HMO",
  patientName: "A. Okafor",
  status: "PARTIALLY_PAID" as ClaimStatus,
  submitted: 8500000,
  approved: 6000000,
  paid: 7000000,
  balance: 1500000,
  allocations: [
    { id: "AL-1", date: "2026-08-20", source: "HMO", reference: "REM-0912", amount: 6000000 },
    { id: "AL-2", date: "2026-09-10", source: "PATIENT_PAYSTACK", reference: "MR-PS-8831", amount: 1000000 },
  ],
  
};
export const claims = [
  { id: "CLM-20458", hmo: "Hygeia HMO", patientName: "A. Okafor", status: "PARTIALLY_PAID" as ClaimStatus, submitted: 8500000, paid: 6000000 },
  { id: "CLM-20311", hmo: "AXA Mansard", patientName: "B. Adeyemi", status: "APPROVED" as ClaimStatus, submitted: 12000000, paid: 0 },
  { id: "CLM-20502", hmo: "Leadway", patientName: "C. Nwosu", status: "REJECTED" as ClaimStatus, submitted: 4500000, paid: 0 },
  { id: "CLM-20470", hmo: "Hygeia HMO", patientName: "D. Balogun", status: "PAID" as ClaimStatus, submitted: 3200000, paid: 3200000 },
];

// ---------- REMITTANCES ----------

export const remittances = [
  { id: "DOC-77", hmo: "Hygeia HMO", fileName: "hygeia-remittance-aug.pdf", uploadedAt: "2026-09-18", status: "COMPLETED", rowCount: 1 },
  { id: "DOC-78", hmo: "AXA Mansard", fileName: "axa-remittance-sept.xlsx", uploadedAt: "2026-09-20", status: "COMPLETED", rowCount: 24 },
  { id: "DOC-79", hmo: "Leadway", fileName: "leadway-scan.jpg", uploadedAt: "2026-09-25", status: "PROCESSING", rowCount: 0 },
];

// ---------- PAYMENTS ----------

export const payments = [
  { id: "PAY-1", claimId: "CLM-20458", source: "HMO", reference: "REM-0912", amount: 6000000, date: "2026-08-20" },
  { id: "PAY-2", claimId: "CLM-20458", source: "PATIENT_PAYSTACK", reference: "MR-PS-8831", amount: 1000000, date: "2026-09-10" },
  { id: "PAY-3", claimId: "CLM-20470", source: "HMO", reference: "REM-0913", amount: 3200000, date: "2026-07-15" },
];

// ---------- HMOS ----------

export const hmos = [
  { id: "HMO-1", name: "Hygeia HMO", plans: 3, activeClaims: 42 },
  { id: "HMO-2", name: "AXA Mansard", plans: 2, activeClaims: 28 },
  { id: "HMO-3", name: "Leadway", plans: 4, activeClaims: 15 },
];

// ---------- TARIFFS ----------

export const tariffs = [
  { id: "TAR-1", hmo: "Hygeia HMO", service: "Malaria panel", amount: 6000000, effectiveFrom: "2026-01-01" },
  { id: "TAR-2", hmo: "Hygeia HMO", service: "Consultation", amount: 1500000, effectiveFrom: "2026-01-01" },
  { id: "TAR-3", hmo: "AXA Mansard", service: "Full blood count", amount: 2500000, effectiveFrom: "2026-02-01" },
];

// ---------- EXTRACTION (for the Correction screen) ----------
// Confirmed with AI engineer: extraction is ASYNC.
// Flow: POST the file -> get { jobId } -> poll a status endpoint
// until status is "completed" (rows attached) or "failed".
// Bounding boxes are PERCENTAGES of the image (0 to 100), not pixels,
// so you can position an overlay with style={{ left: `${x}%`, top: `${y}%` }}.

export interface ExtractedCell {
  value: string;
  confidence: number;           // 0 to 1. Under ~0.8, highlight it for review.
  page: number;
  bbox: [number, number, number, number]; // [x%, y%, width%, height%]
}

export interface ExtractedRow {
  rowId: number;
  cells: Record<string, ExtractedCell>; // e.g. claimRef, approved, reason
}

export interface ExtractionJob {
  jobId: string;
  status: "queued" | "processing" | "completed" | "failed";
  documentId?: string;
  fileUrl?: string;
  modelVersion?: string;
  rows?: ExtractedRow[];   // present only when status is "completed"
  error?: string;          // present only when status is "failed"
}

// What POST /extractions returns immediately (before polling)
export const extractionJobCreated: Pick<ExtractionJob, "jobId" | "status"> = {
  jobId: "JOB-5521",
  status: "queued",
};

// What GET /extractions/{jobId} returns once processing finishes
export const extractionJobCompleted: ExtractionJob = {
  jobId: "JOB-5521",
  status: "completed",
  documentId: "DOC-77",
  fileUrl: "/mock/remittance-page-1.png", // put any sample image here
  modelVersion: "PaddleOCR-VL-1.6",
  rows: [
    {
      rowId: 1,
      cells: {
        claimRef: { value: "CLM-20458", confidence: 0.99, page: 1, bbox: [4, 20, 14, 5] },
        approved: { value: "6000000", confidence: 0.98, page: 1, bbox: [40, 20, 10, 5] },
        // low confidence: highlight this cell in the UI
        reason: { value: "Amt abve agreed tarif", confidence: 0.58, page: 1, bbox: [52, 20, 18, 5] },
      },
    },
  ],
};

// Example of a failed job, for testing your error/retry state
export const extractionJobFailed: ExtractionJob = {
  jobId: "JOB-5522",
  status: "failed",
  error: "Document unreadable",
};

// ---------- POLLING HELPER ----------
// Reusable for extraction jobs AND Paystack payment status (Phase 6).
// Usage:
//   const result = await pollUntilDone(
//     () => fetchJobStatus(jobId),
//     (job) => job.status === "completed" || job.status === "failed"
//   );

export async function pollUntilDone<T>(
  fetchFn: () => Promise<T>,
  isDone: (result: T) => boolean,
  { intervalMs = 2500, timeoutMs = 60000 } = {}
): Promise<T> {
  const start = Date.now();
  while (true) {
    const result = await fetchFn();
    if (isDone(result)) return result;
    if (Date.now() - start > timeoutMs) {
      throw new Error("Timed out waiting for job to finish");
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

// ---------- PAYSTACK PATIENT REQUEST ----------

// POST /payments/patient-request response
export const patientRequestResponse = {
  reference: "MR-PS-8832",
  authorizationUrl: "https://checkout.paystack.com/xxxx", // redirect here
  accessCode: "xxxx",                                     // or use with Popup
  amount: 2500000,
  status: "PENDING" as "PENDING" | "PAID" | "FAILED",     // poll this, never set it yourself
};