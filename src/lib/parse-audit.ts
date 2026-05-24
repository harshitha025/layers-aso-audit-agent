export function parseAuditResponse(text: string) {
  try {
    const parsed = JSON.parse(text);

    return {
      overallScore: parsed.overallScore || 0,

      dimensionScores: {
        title: parsed.dimensionScores?.title || 0,
        subtitle: parsed.dimensionScores?.subtitle || 0,
        keywordField: parsed.dimensionScores?.keywordField || 0,
        description: parsed.dimensionScores?.description || 0,
        screenshots: parsed.dimensionScores?.screenshots || 0,
        appPreviewVideo: parsed.dimensionScores?.appPreviewVideo || 0,
        ratingsReviews: parsed.dimensionScores?.ratingsReviews || 0,
        icon: parsed.dimensionScores?.icon || 0,
        conversionSignals: parsed.dimensionScores?.conversionSignals || 0,
        competitivePosition: parsed.dimensionScores?.competitivePosition || 0
      },

      quickWins: parsed.quickWins || [],
      highImpactChanges: parsed.highImpactChanges || [],
      strategicRecommendations: parsed.strategicRecommendations || [],
      competitorComparison: parsed.competitorComparison || []
    };
  } catch {
    return {
      overallScore: 0,
      dimensionScores: {
        title: 0,
        subtitle: 0,
        keywordField: 0,
        description: 0,
        screenshots: 0,
        appPreviewVideo: 0,
        ratingsReviews: 0,
        icon: 0,
        conversionSignals: 0,
        competitivePosition: 0
      },
      quickWins: [],
      highImpactChanges: [],
      strategicRecommendations: [],
      competitorComparison: []
    };
  }
}