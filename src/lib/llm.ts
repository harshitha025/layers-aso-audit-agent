export async function runAsoAudit(
  appData: any
) {

  const response = await fetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      method: "POST",

      headers: {
        "Content-Type":"application/json",

        "Authorization":
        `Bearer ${process.env.NVIDIA_API_KEY}`
      },

      body: JSON.stringify({

        model:
        "meta/llama-3.1-70b-instruct",

        messages: [

          {
            role:"system",

            content:
            `You are an expert App Store Optimization specialist.
            Perform a complete ASO audit.`
          },

          {
            role:"user",

            content:`

App Name:${appData.appName}

Developer:${appData.developer}

Category:${appData.category}

Description:
${appData.description}

Return ONLY valid JSON. Do not include markdown. Do not include explanation outside JSON.

Use this exact structure:

{
  "overallScore": 85,
  "dimensionScores": {
    "title": 8,
    "subtitle": 7,
    "keywordField": 6,
    "description": 8,
    "screenshots": 7,
    "appPreviewVideo": 4,
    "ratingsReviews": 9,
    "icon": 8,
    "conversionSignals": 6,
    "competitivePosition": 7
  },
  "quickWins": [
    "specific recommendation with evidence"
  ],
  "highImpactChanges": [
    "specific recommendation with evidence"
  ],
  "strategicRecommendations": [
    "specific recommendation with evidence"
  ],
  "competitorComparison": [
    {
      "name": "Competitor name",
      "rating": "4.8",
      "strength": "specific visible strength"
    }
  ]
}

Rules:
- overallScore must be out of 100.
- dimensionScores must be out of 10.
- quickWins must have 3 to 5 items.
- highImpactChanges must have 3 to 5 items.
- strategicRecommendations must have 3 to 5 items.
- competitorComparison must include 3 competitors.
- Recommendations must be specific to the app data, not generic.

{
 "overallScore": number,

 "quickWins":[string],

 "highImpactChanges":[string],

 "strategicRecommendations":[string],

 "competitorComparison":[
   {
     "name":string,
     "rating":string,
     "strength":string
   }
 ]
}
`
          }

        ],

        temperature:0.3,
        max_tokens:1500

      })

    }
  );

  const data =
  await response.json();

  return data.choices[0]
  .message.content;

}