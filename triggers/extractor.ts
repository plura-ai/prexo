import { logger, task } from "@trigger.dev/sdk/v3";
import { extractText } from "./lib/extract-text";

export const textExtractor = task({
  id: "extractor",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload: {url: string}, { ctx }) => {
    logger.log("Starting text extraction for", { payload, ctx });
    const extText = await extractText(payload.url);
    logger.log("Text Extracted: ", {extText});
    return {
      txt: extText,
    }
  },
});