/** Returns true if all the search characters are inside of the original string. */
export function getInnerMatch(original: string, search: string): boolean {
  let originalChars = [...original];
  let searchChars = [...search];

  let has_all_chars = true;

  for (const char of searchChars) {
    if (!originalChars.includes(char)) {
      has_all_chars = false;
      break;
    }
  }

  return has_all_chars;
}
