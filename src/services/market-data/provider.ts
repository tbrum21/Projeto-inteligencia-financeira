export interface MarketQuote {
  ticker: string;
  price: string;
  currency: string;
  referenceAt: string;
  capturedAt: string;
  source: string;
  priceType: "close" | "intraday";
  delayed: boolean;
  status: "available" | "unavailable" | "stale";
}

export interface MarketDataProvider {
  getLatestQuote(ticker: string): Promise<MarketQuote>;
  getDailyHistory(ticker: string, from: Date, to: Date): Promise<MarketQuote[]>;
}

/** Explicit fallback: it never manufactures a price when the configured provider is unavailable. */
export class UnavailableMarketDataProvider implements MarketDataProvider {
  async getLatestQuote(ticker: string): Promise<MarketQuote> {
    return { ticker, price: "0", currency: "BRL", referenceAt: new Date(0).toISOString(), capturedAt: new Date().toISOString(), source: "unconfigured", priceType: "close", delayed: true, status: "unavailable" };
  }
  async getDailyHistory(): Promise<MarketQuote[]> { return []; }
}
