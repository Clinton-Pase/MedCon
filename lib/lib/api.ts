
import { exceptions, overview, aging, claimDetail, claims, remittances,payments,hmos,tariffs, } from "@/mock-data/mock-data";

export async function getClaims() {
  return claims;
}

export async function getExceptions() {
  return exceptions;
}

export async function getException(id: string) {
  return exceptions.find((exc) => exc.id === id) ?? null;
}

export async function getOverview() {
  return overview;
}

export async function getAging() {
  return aging;
}
export async function getRemittances() {
  return remittances;
}

export async function getPayments() {
  return payments;
}

export async function getHmos() {
  return hmos;
}

export async function getTariffs() {
  return tariffs;
}

export async function getClaim(id: string) {
  if (id === claimDetail.id) return claimDetail;

  const c = claims.find((claim) => claim.id === id);
  if (!c) return null;

  return {
    ...c,
    approved: c.status === "REJECTED" ? 0 : c.submitted,
    balance: c.submitted - c.paid,
    allocations: [] as typeof claimDetail.allocations,
  };
}