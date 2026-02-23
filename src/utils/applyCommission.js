export const COMMISSION_RATE = 0.18;

export function applyCommission(price) {
  const p = Number(price);
  return Math.round(p * (1 + COMMISSION_RATE));
}
