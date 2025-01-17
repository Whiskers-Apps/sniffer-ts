import { expect, test } from "vitest";
import { getHammingDistance } from "./hamming";
import { getLevenshteinDistance } from "./levenshtein";
import { getJaroWinklerDistance } from "./jaro_winkler";
import { getInnerMatch } from "./inner";
import { getContainMatch } from "./contain";
import { Sniffer } from "./sniffer";

test("Levenshtein Distance", () => {
  expect(getLevenshteinDistance("Banana", "banini")).toBe(3);
});

test("Hamming Distance", () => {
  expect(getHammingDistance("bulbasaur", "bulbysaul")).toBe(2);
});

test("Jaro Winkler Distance", () => {
  expect(getJaroWinklerDistance("banana", "banan")).toBe(0.9666666666666667);
});

test("Inner Match", () => {
  expect(getInnerMatch("Sprigatito", "agt")).toBe(true);
});

test("Contain Match", () => {
  expect(getContainMatch("macacos me mordam", "sme")).toBe(true);
});

test("Sniffer", () => {
  let sniffer = new Sniffer();
  expect(sniffer.matches("Banana", "banana")).toBe(true);
});

test("Sniffer Result", () => {
  let sniffer = new Sniffer();
  let result = sniffer.getSnifferResult("Luxray", "lux");

  expect(result.levenshtein).toBe(3);
  expect(result.jaroWinkler).toBe(0.8833333333333334);
  expect(result.inner).toBe(true);
  expect(result.contain).toBe(true);
});
