/**
 * Print a console.warn exactly once per call site in dev.
 * Call sites are identified by the React Error stack trace.
 * In production (process.env.NODE_ENV === "production"), this is a no-op.
 */
const seen = new Set<string>();

export function warnOnceForCallSite(message: string): void {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") return;

  // Use Error stack to identify the call site.
  // Different engines format stacks differently (V8 includes "Error" header,
  // JavaScriptCore does not). Locate this function's frame first, then take
  // the next 1-2 frames as the caller identity.
  const stack = new Error().stack ?? "";
  const lines = stack.split("\n");
  const selfIdx = lines.findIndex((l) => l.includes("warnOnceForCallSite"));
  const start = selfIdx >= 0 ? selfIdx + 1 : 0;
  const callSite = lines.slice(start, start + 2).join("\n");

  const key = message + "::" + callSite;
  if (seen.has(key)) return;
  seen.add(key);

  // eslint-disable-next-line no-console
  console.warn(message);
}

/** Test-only — reset the seen set so tests can re-fire warnings. */
export function __resetWarnedOnce(): void {
  seen.clear();
}
