const requestCounts = new Map<
  string,
  Map<string, { count: number; timestamp: number }>
>();

export const computeCost = (
  apiKey: string,
  tag: string,
  window: number,
  noOfreqs: number,
  cost: number,
): number => {
  console.log(
    "\x1b[36m[computeCost] Starting computation for API key:\x1b[0m",
    apiKey.substring(0, 8),
    "tag:",
    tag,
  );
  console.log(
    "\x1b[33m[computeCost] Parameters - window:\x1b[0m",
    window,
    "s, noOfreqs:",
    noOfreqs,
    ", cost:",
    cost,
    ", tag:",
    tag,
  );

  const timeF = window * 1000;
  const now = Date.now();
  console.log(
    "\x1b[33m[computeCost] Time window:\x1b[0m",
    timeF,
    "ms, current timestamp:",
    now,
  );

  let tagMap = requestCounts.get(apiKey);
  if (!tagMap) {
    tagMap = new Map();
    requestCounts.set(apiKey, tagMap);
  }

  const entry = tagMap.get(tag);
  console.log(
    "\x1b[36m[computeCost] Existing entry for tag:\x1b[0m",
    tag,
    entry,
  );

  if (!entry || now - entry.timestamp > timeF) {
    console.log(
      "\x1b[32m[computeCost] Creating new entry or resetting expired entry for tag\x1b[0m",
      tag,
    );
    tagMap.set(tag, { count: 1, timestamp: now });
    console.log(
      "\x1b[32m[computeCost] Returning 0 cost for new/reset entry (tag)\x1b[0m",
      tag,
    );
    return 0;
  }

  console.log(
    "\x1b[35m[computeCost] Updating existing entry for tag - previous count:\x1b[0m",
    tag,
    entry.count,
  );
  entry.count += 1;
  tagMap.set(tag, entry);
  console.log(
    "\x1b[35m[computeCost] Updated entry for tag - new count:\x1b[0m",
    tag,
    entry.count,
  );

  if (entry.count >= noOfreqs) {
    console.log(
      "\x1b[31m[computeCost] Threshold reached for tag — charging cost:\x1b[0m",
      tag,
      cost,
    );
    tagMap.set(tag, { count: 0, timestamp: now });
    return cost;
  }

  console.log(
    "\x1b[31m[computeCost] Final cost calculation for tag:\x1b[0m",
    tag,
    0,
    "(count:",
    entry.count,
    ", threshold:",
    noOfreqs,
    ")",
  );
  return 0;
};
