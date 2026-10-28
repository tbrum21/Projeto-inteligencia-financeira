import { z } from "zod";

export const transactionInputSchema = z.object({
  portfolioId: z.string().uuid(),
  assetId: z.string().uuid().optional(),
  kind: z.enum(["buy", "sell", "dividend", "jcp", "fee", "cash_deposit", "cash_withdrawal"]),
  tradeDate: z.string().date(),
  settlementDate: z.string().date().optional(),
  quantity: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  unitPrice: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  grossAmount: z.string().regex(/^\d+(\.\d+)?$/).optional(),
  fees: z.string().regex(/^\d+(\.\d+)?$/).default("0"),
}).superRefine((record, context) => {
  if (["buy", "sell"].includes(record.kind) && (!record.assetId || !record.quantity || !record.unitPrice)) {
    context.addIssue({ code: "custom", message: "Operações de compra e venda exigem ativo, quantidade e preço." });
  }
});
