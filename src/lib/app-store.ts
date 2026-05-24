import { AppMetadata } from "@/types/aso";

export function parseAppStoreUrl(url: string) {
  const match = url.match(
    /apps\.apple\.com\/([a-z]{2})\/app\/.*\/id(\d+)/
  );

  if (!match) {
    throw new Error("Invalid App Store URL");
  }

  return {
    country: match[1],
    appId: match[2]
  };
}

export async function fetchAppMetadata(
  url: string
): Promise<AppMetadata> {

  const { appId, country } = parseAppStoreUrl(url);

  const response = await fetch(
    `https://itunes.apple.com/lookup?id=${appId}&country=${country}`
  );

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error("App not found");
  }

  const app = data.results[0];

  return {
    appId,
    appName: app.trackName,
    developer: app.artistName,
    iconUrl: app.artworkUrl512,
    category: app.primaryGenreName,
    country,
    appStoreUrl: app.trackViewUrl,
    title: app.trackName,
    subtitle: app.subtitle || "",
    description: app.description || "",
    screenshots: app.screenshotUrls || [],
    rating: app.averageUserRating || null,
    ratingCount: app.userRatingCount || null,
    version: app.version || null,
    releaseNotes: app.releaseNotes || null,
    price: app.formattedPrice || "Free"
  };
}