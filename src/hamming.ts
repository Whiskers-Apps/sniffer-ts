/** Returns the amount of different positional characters (Hamming distance).

    More at https://en.wikipedia.org/wiki/Hamming_distance
 */
export function getHammingDistance(original: string, search: string): number {
  let originalChars = [...original];
  let searchChars = [...search];

  if (originalChars.length !== searchChars.length) {
    throw new Error("Strings must have the same length");
  }

  let distance = 0;

  originalChars.forEach((char, index) => {
    if (char !== searchChars[index]) {
      distance += 1;
    }
  });

  return distance;
}
