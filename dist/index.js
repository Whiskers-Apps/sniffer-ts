"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Sniffer: () => Sniffer,
  getContainMatch: () => getContainMatch,
  getHammingDistance: () => getHammingDistance,
  getInnerMatch: () => getInnerMatch,
  getJaroWinklerDistance: () => getJaroWinklerDistance,
  getLevenshteinDistance: () => getLevenshteinDistance
});
module.exports = __toCommonJS(index_exports);

// src/contain.ts
function getContainMatch(original, search) {
  let trimmed_original = original.replace(" ", "");
  let trimmed_search = search.replace(" ", "");
  return trimmed_original.includes(trimmed_search);
}

// src/hamming.ts
function getHammingDistance(original, search) {
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

// src/inner.ts
function getInnerMatch(original, search) {
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

// src/jaro_winkler.ts
function getJaroWinklerDistance(original, search) {
  const originalChars = Array.from(original);
  const searchChars = Array.from(search);
  const originalSize = originalChars.length;
  const searchSize = searchChars.length;
  if (originalSize === 0 && searchSize === 0) {
    return 1;
  }
  const matchDistance = Math.floor(Math.max(originalSize, searchSize) / 2) - 1;
  const originalMatches = new Array(originalSize).fill(false);
  const searchMatches = new Array(searchSize).fill(false);
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
    return 0;
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
  const jaro = (matches / originalSize + matches / searchSize + (matches - transpositions) / matches) / 3;
  let commonPrefixLength = 0;
  for (let i = 0; i < Math.min(originalSize, searchSize, 4); i++) {
    if (originalChars[i] === searchChars[i]) {
      commonPrefixLength++;
    } else {
      break;
    }
  }
  const prefixLength = Math.min(commonPrefixLength, 4);
  const jaroWinkler = jaro + 0.1 * prefixLength * (1 - jaro);
  return jaroWinkler;
}

// src/levenshtein.ts
function getLevenshteinDistance(original, search) {
  let originalChars = [...original];
  let originalSize = originalChars.length;
  let searchChars = [...search];
  let searchSize = searchChars.length;
  const distance = Array.from(
    { length: originalSize + 1 },
    () => Array(searchSize + 1).fill(0)
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

// src/sniffer.ts
var Sniffer = class {
  /** The amount of characters that can be different */
  levenshteinDistance = 2;
  /** Use levenshtein match */
  doLevenshteinMatch = true;
  /** The amount of positional characters that can be different */
  hammingDistance = 2;
  /** Use hamming match */
  doHammingMatch = true;
  /** The difference contain the search and the original. From 0.0 to 1.0 */
  jaroWinklerDistance = 0.8;
  /** Use jaro winkler match */
  doJaroWinklerMatch = true;
  /** Use inner match */
  doInnerMatch = false;
  /** Use contain match */
  doContainMatch = true;
  /** Do case-sensitive search */
  caseSensitive = false;
  matches(original, search) {
    let firstWord = this.caseSensitive ? original : original.toLowerCase();
    let secondWord = this.caseSensitive ? search : search.toLowerCase();
    let firstWordChars = [...firstWord];
    let secondWordChars = [...secondWord];
    let levenshteinMatch = this.doLevenshteinMatch ? getLevenshteinDistance(firstWord, secondWord) <= this.hammingDistance : false;
    let hammingMatch = this.doHammingMatch && firstWordChars.length === secondWordChars.length ? getHammingDistance(firstWord, secondWord) <= this.hammingDistance : false;
    let jaroWinklerMatch = this.doJaroWinklerMatch ? getJaroWinklerDistance(firstWord, secondWord) >= this.jaroWinklerDistance : false;
    let innerMatch = this.doInnerMatch ? getInnerMatch(firstWord, secondWord) : false;
    let containMatch = this.doContainMatch ? getContainMatch(firstWord, secondWord) : false;
    return levenshteinMatch || hammingMatch || jaroWinklerMatch || innerMatch || containMatch;
  }
  getSnifferResult(original, search) {
    let firstWord = this.caseSensitive ? original : original.toLowerCase();
    let secondWord = this.caseSensitive ? search : search.toLowerCase();
    let firstWordChars = [...firstWord];
    let secondWordChars = [...secondWord];
    return {
      levenshtein: getLevenshteinDistance(firstWord, secondWord),
      hamming: firstWordChars.length === secondWordChars.length ? getHammingDistance(firstWord, secondWord) : -1,
      jaroWinkler: getJaroWinklerDistance(firstWord, secondWord),
      inner: getInnerMatch(firstWord, secondWord),
      contain: getContainMatch(firstWord, secondWord)
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sniffer,
  getContainMatch,
  getHammingDistance,
  getInnerMatch,
  getJaroWinklerDistance,
  getLevenshteinDistance
});
