import { z } from "zod";
import { createTool } from "@mastra/core/tools";

import {
 fetchAppMetadata
} from "@/lib/app-store";

export const appMetadataTool =
createTool({

  id: "app-metadata-tool",

  description:
  "Fetch metadata from an App Store URL",

  inputSchema: z.object({

    url: z.string()

  }),

  outputSchema: z.object({

    appName: z.string(),

    developer: z.string(),

    category: z.string(),

    country: z.string()

  }),

  execute: async ({ url }) => {

  const metadata =
    await fetchAppMetadata(
      url
    );

  return {

    appName:
      metadata.appName,

    developer:
      metadata.developer,

    category:
      metadata.category,

    country:
      metadata.country

  };

}

});