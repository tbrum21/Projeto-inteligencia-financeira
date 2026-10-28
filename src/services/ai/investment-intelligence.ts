import OpenAI from "openai";
import { z } from "zod";

export const investmentAnalysisSchema = z.object({
  ticker: z.string(), analysis_type: z.literal("asset_review"), status: z.enum(["available", "insufficient_data", "unavailable"]),
  objective_score: z.number().nullable(), summary: z.string(), positive_factors: z.array(z.string()), risk_factors: z.array(z.string()),
  portfolio_impact: z.string(), possible_scenarios: z.array(z.string()), missing_information: z.array(z.string()),
  sources: z.array(z.object({ title: z.string(), url: z.string().url().optional() })), market_data_timestamp: z.string().nullable(), generated_at: z.string().datetime(),
});

export type InvestmentAnalysis = z.infer<typeof investmentAnalysisSchema>;

export class InvestmentIntelligenceService {
  private client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

  async analyzeAsset(facts: { ticker: string; indicators: Record<string, string | number | null>; sources: string[] }): Promise<InvestmentAnalysis> {
    if (!this.client || process.env.AI_ENABLED === "false") throw new Error("AI analysis is disabled or not configured.");
    const response = await this.client.responses.create({
      model: process.env.OPENAI_MODEL ?? "gpt-6-astra",
      input: [{ role: "system", content: "Analyze only the supplied facts. Distinguish facts from inferences. Do not give guaranteed investment recommendations." }, { role: "user", content: JSON.stringify(facts) }],
      text: { format: { type: "json_schema", name: "investment_analysis", strict: true, schema: { type: "object", additionalProperties: false, properties: { ticker: { type: "string" }, analysis_type: { type: "string", enum: ["asset_review"] }, status: { type: "string", enum: ["available", "insufficient_data", "unavailable"] }, objective_score: { type: ["number", "null"] }, summary: { type: "string" }, positive_factors: { type: "array", items: { type: "string" } }, risk_factors: { type: "array", items: { type: "string" } }, portfolio_impact: { type: "string" }, possible_scenarios: { type: "array", items: { type: "string" } }, missing_information: { type: "array", items: { type: "string" } }, sources: { type: "array", items: { type: "object", additionalProperties: false, properties: { title: { type: "string" }, url: { type: "string" } }, required: ["title"] } }, market_data_timestamp: { type: ["string", "null"] }, generated_at: { type: "string" } }, required: ["ticker", "analysis_type", "status", "objective_score", "summary", "positive_factors", "risk_factors", "portfolio_impact", "possible_scenarios", "missing_information", "sources", "market_data_timestamp", "generated_at"] } } },
    });
    return investmentAnalysisSchema.parse(JSON.parse(response.output_text));
  }
}
