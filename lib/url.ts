/** Validate that a URL uses http: or https: before putting it in an href/src. */
export function safeHttpUrl(u: string | null | undefined): string {
  if (!u) return '#';
  try {
    const parsed = new URL(u);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.toString();
  } catch {
    // malformed URL — fall through to fallback
  }
  return '#';
}
