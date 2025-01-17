export function getJaroWinklerDistance(original: string, search: string): number {
  const originalChars: string[] = Array.from(original);
  const searchChars: string[] = Array.from(search);

  const originalSize: number = originalChars.length;
  const searchSize: number = searchChars.length;

  if (originalSize === 0 && searchSize === 0) {
    return 1.0;
  }

  const matchDistance: number = Math.floor(Math.max(originalSize, searchSize) / 2) - 1;

  const originalMatches: boolean[] = new Array(originalSize).fill(false);
  const searchMatches: boolean[] = new Array(searchSize).fill(false);

  let matches = 0;
  let transpositions = 0;

  for (let i = 0; i < originalSize; i++) {
    const start = Math.max(0, i - matchDistance);
    const end = Math.min(i + matchDistance + 1, searchSize);

    for (let j = start; j < end; j++) {
      if (!searchMatches[j] && originalChars[i] === searchChars[j]) {
        originalMatches[i] = true;
        searchMatches[j] = true;
        matches++;
        break;
      }
    }
  }

  if (matches === 0) {
    return 0.0;
  }

  let transpositionsCount = 0;

  for (let i = 0; i < originalSize; i++) {
    if (originalMatches[i]) {
      while (!searchMatches[transpositionsCount]) {
        transpositionsCount++;
      }

      if (originalChars[i] !== searchChars[transpositionsCount]) {
        transpositions++;
      }

      transpositionsCount++;
    }
  }

  transpositions = Math.floor(transpositions / 2);

  const jaro =
    (matches / originalSize + matches / searchSize + (matches - transpositions) / matches) / 3.0;

  let commonPrefixLength = 0;

  for (let i = 0; i < Math.min(originalSize, searchSize, 4); i++) {
    if (originalChars[i] === searchChars[i]) {
      commonPrefixLength++;
    } else {
      break;
    }
  }

  const prefixLength = Math.min(commonPrefixLength, 4);

  const jaroWinkler = jaro + 0.1 * prefixLength * (1.0 - jaro);

  return jaroWinkler;
}
