export interface DomainMetrics {
  memorability: number;
  keywordValue: number;
  brandability: number;
  tldQuality: number;
  marketDemand: number;
}

export interface SimilarSale {
  domain: string;
  price: string;
  year: string;
}

export interface DomainAlternative {
  domain: string;
  reason: string;
  estimatedPrice: string;
}

export interface DomainValuation {
  domainName: string;
  estimatedValueRange: string;
  numericValueMin: number;
  numericValueMax: number;
  currency: string;
  executiveSummary: string;
  metrics: DomainMetrics;
  strengths: string[];
  weaknesses: string[];
  potentialUses: string[];
  similarSales: SimilarSale[];
  alternatives: DomainAlternative[];
}