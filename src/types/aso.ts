export type AppMetadata = {
  appId: string;
  appName: string;
  developer: string;
  iconUrl: string;
  category: string;
  country: string;
  appStoreUrl: string;
  title: string;
  subtitle: string;
  description: string;
  screenshots: string[];
  rating: number | null;
  ratingCount: number | null;
  version: string | null;
  releaseNotes: string | null;
  price: string;
};
export type AuditResult = {
  overallScore: number;

  quickWins: string[];

  highImpactChanges: string[];

  strategicRecommendations: string[];

  competitorComparison: {
    name: string;
    rating: string;
    strength: string;
  }[];
};