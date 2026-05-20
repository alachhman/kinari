/**
 * Print a console.warn exactly once per call site in dev.
 * Call sites are identified by the React Error stack trace.
 * In production (process.env.NODE_ENV === "production"), this is a no-op.
 */
const seen = new Set<string>();

export function warnOnceForCallSite(message: string): void {
  if (typeof process !== "undefined" && process.env?.NODE_ENV === "production") return;

  // Use Error stack to identify the call site
  const stack = new Error().stack ?? "";
  // Strip the first two lines (Error message + this function itself)
  const callSite = stack.split("\n").slice(2, 4).join("\n");

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
