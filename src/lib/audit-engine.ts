import { AppMetadata } from "@/types/aso";
import { AuditResult } from "@/types/aso";

export function generateAudit(
  app: AppMetadata
): AuditResult {

  return {

    overallScore: 78,

    quickWins: [
      "Improve screenshot captions",
      "Use stronger CTA language",
      "Expand subtitle keywords"
    ],

    highImpactChanges: [
      "Redesign first screenshots",
      "Increase keyword coverage"
    ],

    strategicRecommendations: [
      "Track competitor keywords",
      "Test custom product pages"
    ],

    competitorComparison: [
      {
        name: "Apple Music",
        rating: "4.7",
        strength: "Strong ecosystem"
      },
      {
        name: "YouTube Music",
        rating: "4.8",
        strength: "Strong discovery"
      },
      {
        name: "Amazon Music",
        rating: "4.5",
        strength: "Large catalog"
      }
    ]

  };

}