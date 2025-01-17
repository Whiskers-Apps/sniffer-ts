/** Returns true if the search string is contained in the original. */
export function getContainMatch(original: string, search: string): boolean {
  let trimmed_original = original.replace(" ", "");
  let trimmed_search = search.replace(" ", "");

  return trimmed_original.includes(trimmed_search);
}
