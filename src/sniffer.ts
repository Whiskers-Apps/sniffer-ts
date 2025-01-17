import { getContainMatch } from "./contain";
import { getHammingDistance } from "./hamming";
import { getInnerMatch } from "./inner";
import { getJaroWinklerDistance } from "./jaro_winkler";
import { getLevenshteinDistance } from "./levenshtein";

/** An object containing the results of all the algorithms */
export interface SnifferResult {
  levenshtein: number;
  hamming: number;
  jaroWinkler: number;
  inner: boolean;
  contain: boolean;
}

export class Sniffer {
  /** The amount of characters that can be different */
  levenshteinDistance: number = 2;
  /** Use levenshtein match */
  doLevenshteinMatch: boolean = true;
  /** The amount of positional characters that can be different */
  hammingDistance: number = 2;
  /** Use hamming match */
  doHammingMatch: boolean = true;
  /** The difference contain the search and the original. From 0.0 to 1.0 */
  jaroWinklerDistance: number = 0.8;
  /** Use jaro winkler match */
  doJaroWinklerMatch: boolean = true;
  /** Use inner match */
  doInnerMatch: boolean = false;
  /** Use contain match */
  doContainMatch: boolean = true;
  /** Do case-sensitive search */
  caseSensitive: boolean = false;

  matches(original: string, search: string): boolean {
    let firstWord = this.caseSensitive ? original : original.toLowerCase();
    let secondWord = this.caseSensitive ? search : search.toLowerCase();

    let firstWordChars = [...firstWord];
    let secondWordChars = [...secondWord];

    let levenshteinMatch = this.doLevenshteinMatch
      ? getLevenshteinDistance(firstWord, secondWord) <= this.hammingDistance
      : false;

    let hammingMatch =
      this.doHammingMatch && firstWordChars.length === secondWordChars.length
        ? getHammingDistance(firstWord, secondWord) <= this.hammingDistance
        : false;

    let jaroWinklerMatch = this.doJaroWinklerMatch
      ? getJaroWinklerDistance(firstWord, secondWord) >= this.jaroWinklerDistance
      : false;

    let innerMatch = this.doInnerMatch ? getInnerMatch(firstWord, secondWord) : false;

    let containMatch = this.doContainMatch ? getContainMatch(firstWord, secondWord) : false;

    return levenshteinMatch || hammingMatch || jaroWinklerMatch || innerMatch || containMatch;
  }

  getSnifferResult(original: string, search: string): SnifferResult {
    let firstWord = this.caseSensitive ? original : original.toLowerCase();
    let secondWord = this.caseSensitive ? search : search.toLowerCase();

    let firstWordChars = [...firstWord];
    let secondWordChars = [...secondWord];

    return {
      levenshtein: getLevenshteinDistance(firstWord, secondWord),
      hamming:
        firstWordChars.length === secondWordChars.length
          ? getHammingDistance(firstWord, secondWord)
          : -1,
      jaroWinkler: getJaroWinklerDistance(firstWord, secondWord),
      inner: getInnerMatch(firstWord, secondWord),
      contain: getContainMatch(firstWord, secondWord),
    };
  }
}
