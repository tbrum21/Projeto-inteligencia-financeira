import Decimal from "decimal.js";

export type TransactionKind = "buy" | "sell" | "dividend" | "jcp" | "fee" | "cash_deposit" | "cash_withdrawal";

export interface LedgerTransaction {
  id: string;
  kind: TransactionKind;
  occurredOn: string;
  assetId?: string;
  quantity?: string;
  unitPrice?: string;
  fees?: string;
  grossAmount?: string;
}

export interface PositionResult {
  quantity: Decimal;
  averageCost: Decimal;
  costBasis: Decimal;
  realizedProfit: Decimal;
  income: Decimal;
}

const zero = () => new Decimal(0);
const value = (input: string | undefined) => new Decimal(input ?? 0);

/** Rebuilds one asset position from chronological, immutable ledger records. */
export function calculatePosition(transactions: LedgerTransaction[], assetId: string): PositionResult {
  const events = transactions
    .filter((item) => item.assetId === assetId)
    .sort((a, b) => a.occurredOn.localeCompare(b.occurredOn) || a.id.localeCompare(b.id));
  let quantity = zero();
  let costBasis = zero();
  let realizedProfit = zero();
  let income = zero();

  for (const item of events) {
    const qty = value(item.quantity);
    const price = value(item.unitPrice);
    const fees = value(item.fees);
    if (item.kind === "buy") {
      if (qty.lte(0)) throw new Error("A purchase must have a positive quantity.");
      quantity = quantity.plus(qty);
      costBasis = costBasis.plus(qty.mul(price)).plus(fees);
    }
    if (item.kind === "sell") {
      if (qty.lte(0) || qty.gt(quantity)) throw new Error("A sale cannot exceed the available position.");
      const averageCost = quantity.isZero() ? zero() : costBasis.div(quantity);
      const assignedCost = averageCost.mul(qty);
      realizedProfit = realizedProfit.plus(qty.mul(price).minus(fees).minus(assignedCost));
      quantity = quantity.minus(qty);
      costBasis = costBasis.minus(assignedCost);
    }
    if (item.kind === "dividend" || item.kind === "jcp") income = income.plus(value(item.grossAmount).minus(fees));
  }

  return { quantity, averageCost: quantity.isZero() ? zero() : costBasis.div(quantity), costBasis, realizedProfit, income };
}
