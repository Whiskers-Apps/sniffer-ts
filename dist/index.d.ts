/** Returns true if the search string is contained in the original. */
declare function getContainMatch(original: string, search: string): boolean;

/** Returns the amount of different positional characters (Hamming distance).

    More at https://en.wikipedia.org/wiki/Hamming_distance
 */
declare function getHammingDistance(original: string, search: string): number;

/** Returns true if all the search characters are inside of the original string. */
declare function getInnerMatch(original: string, search: string): boolean;

declare function getJaroWinklerDistance(original: string, search: string): number;

/** Returns the amount of characters needed to change for the strings to match. */
declare function getLevenshteinDistance(original: string, search: string): number;

/** An object containing the results of all the algorithms */
interface SnifferResult {
    levenshtein: number;
    hamming: number;
    jaroWinkler: number;
    inner: boolean;
    contain: boolean;
}
declare class Sniffer {
    /** The amount of characters that can be different */
    levenshteinDistance: number;
    /** Use levenshtein match */
    doLevenshteinMatch: boolean;
    /** The amount of positional characters that can be different */
    hammingDistance: number;
    /** Use hamming match */
    doHammingMatch: boolean;
    /** The difference contain the search and the original. From 0.0 to 1.0 */
    jaroWinklerDistance: number;
    /** Use jaro winkler match */
    doJaroWinklerMatch: boolean;
    /** Use inner match */
    doInnerMatch: boolean;
    /** Use contain match */
    doContainMatch: boolean;
    /** Do case-sensitive search */
    caseSensitive: boolean;
    matches(original: string, search: string): boolean;
    getSnifferResult(original: string, search: string): SnifferResult;
}

export { Sniffer, type SnifferResult, getContainMatch, getHammingDistance, getInnerMatch, getJaroWinklerDistance, getLevenshteinDistance };
