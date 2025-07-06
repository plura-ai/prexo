
const requestCounts = new Map<string, { count: number; timestamp: number }>();

export const computeCost = (apiKey: string, window: number, noOfreqs: number, cost: number): number => {
  console.log("\x1b[36m[computeCost] Starting computation for API key:\x1b[0m", apiKey.substring(0, 8));
  console.log("\x1b[33m[computeCost] Parameters - window:\x1b[0m", window, "s, noOfreqs:", noOfreqs, ", cost:", cost);

  const timeF = window * 1000;
  const now = Date.now();
  console.log("\x1b[33m[computeCost] Time window:\x1b[0m", timeF, "ms, current timestamp:", now);

  const entry = requestCounts.get(apiKey);
  console.log("\x1b[36m[computeCost] Existing entry:\x1b[0m", entry);

  if (!entry || now - entry.timestamp > timeF) {
    console.log("\x1b[32m[computeCost] Creating new entry or resetting expired entry\x1b[0m");
    requestCounts.set(apiKey, { count: 1, timestamp: now });
    console.log("\x1b[32m[computeCost] Returning 0 cost for new/reset entry\x1b[0m");
    return 0;
  }

  console.log("\x1b[35m[computeCost] Updating existing entry - previous count:\x1b[0m", entry.count);
  entry.count += 1;
  requestCounts.set(apiKey, entry);
  console.log("\x1b[35m[computeCost] Updated entry - new count:\x1b[0m", entry.count);

  if (entry.count >= noOfreqs) {
    console.log("\x1b[31m[computeCost] Threshold reached — charging cost:\x1b[0m", cost);
    requestCounts.set(apiKey, { count: 0, timestamp: now });
    return cost;
  }

  console.log("\x1b[31m[computeCost] Final cost calculation:\x1b[0m", 0, "(count:", entry.count, ", threshold:", noOfreqs, ")");
  return 0;
};