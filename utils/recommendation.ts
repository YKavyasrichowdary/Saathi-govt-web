export function compareStrings(a?: string | null, b?: string | null) {
  if (!a || !b) return false;

  return a.trim().toLowerCase() === b.trim().toLowerCase();
}