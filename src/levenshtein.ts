/** Returns the amount of characters needed to change for the strings to match. */
export function getLevenshteinDistance(original: string, search: string): number {
  let originalChars = [...original];
  let originalSize = originalChars.length;

  let searchChars = [...search];
  let searchSize = searchChars.length;

  const distance: number[][] = Array.from({ length: originalSize + 1 }, () =>
    Array(searchSize + 1).fill(0)
  );

  for (let i = 0; i <= originalSize; i++) {
    distance[i][0] = i;
  }

  for (let i = 0; i <= searchSize; i++) {
    distance[0][i] = i;
  }

  for (let i = 1; i <= originalSize; i++) {
    for (let j = 1; j <= searchSize; j++) {
      const cost = originalChars[i - 1] === searchChars[j - 1] ? 0 : 1;

      distance[i][j] = Math.min(
        distance[i - 1][j] + 1,
        distance[i][j - 1] + 1,
        distance[i - 1][j - 1] + cost
      );
    }
  }

  return distance[originalSize][searchSize];
}
