import { describe, expect, it } from "vitest";
import { calculatePosition, type LedgerTransaction } from "./ledger";

const assetId = "asset-lavv3";
const event = (id: string, kind: LedgerTransaction["kind"], occurredOn: string, quantity?: string, unitPrice?: string, fees?: string): LedgerTransaction => ({ id, kind, occurredOn, assetId, quantity, unitPrice, fees });

describe("calculatePosition", () => {
  it("keeps weighted cost after multiple purchases", () => {
    const result = calculatePosition([event("1", "buy", "2026-03-26", "6", "14.20"), event("2", "buy", "2026-03-26", "20", "14.06"), event("3", "buy", "2026-03-26", "27", "14.18")], assetId);
    expect(result.quantity.toString()).toBe("53");
    expect(result.averageCost.toDecimalPlaces(8).toString()).toBe("14.13698113");
  });

  it("uses the pre-sale average cost for a partial sale", () => {
    const result = calculatePosition([event("1", "buy", "2026-01-01", "10", "10", "2"), event("2", "buy", "2026-01-02", "10", "20"), event("3", "sell", "2026-02-01", "5", "30", "1")], assetId);
    expect(result.quantity.toString()).toBe("15");
    expect(result.averageCost.toString()).toBe("15.1");
    expect(result.realizedProfit.toString()).toBe("73.5");
  });

  it("preserves realized history when a position closes", () => {
    const result = calculatePosition([event("1", "buy", "2026-03-26", "27", "27.72"), event("2", "sell", "2026-10-06", "27", "33.28")], assetId);
    expect(result.quantity.toString()).toBe("0");
    expect(result.costBasis.toString()).toBe("0");
    expect(result.realizedProfit.toString()).toBe("150.12");
  });
});
