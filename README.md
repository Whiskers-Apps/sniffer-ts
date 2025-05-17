# About

Sniffer is a library for fuzzy match strings in typescript. For example ybe is a match for Youtube. This provides a easy and user friendly way to search for a match without the need for a lot of code.

# Install

To install the library run the install command:

```
npm i sniffer-ts
```

```
yarn add sniffer-ts
```

# Usage

The usage of the library is very simple. It provides 4 algorithms for searching and a sniffer object that contains sane defaults for searching.

## Basic match

```ts
let sniffer = new Sniffer();
let matches = sniffer.matches("banana", "bana");
```

## Case sensitive match

```ts
let sniffer = new Sniffer();
sniffer.caseSensitive = true;
let matches = sniffer.matches("Banana", "banana");
```

## Levenshtein Algorithm

Returns the amount of characters that are different.

```ts
let matches = getLevenshteinDistance("Banana", "banin3");
```

## Hamming Algorithm

Returns the amount of positional characters different. It only works with same size strings.

```ts
let matches = getHammingDistance("banana", "banin3");
```

## Jaro Winkler Algorithm

Returns the difference in a percentage. From 0.0 to 1.0.

```ts
let matches = getJaroWinklerDistance("banana", "banan");
```

## Inner Algorithm

Returns true if the characters are inside the string.

```ts
let matches = getInnerMatch("Sprigatito", "agt");
```

## Contain Match

Returns true if the search string is inside the the original. It matches even if it has spaces.

```ts
let contains = getContainMatch("youtube", "utu");
let contains = getContainMatch("macacos me mordam", "smem");
```

## Sniffer

The sniffer match object can be changed in its initialization in case you don't like the default values.

```ts
let sniffer = new Sniffer();
sniffer.levenshteinDistance = 2;
sniffer.doLevenshteinMatch = true;
sniffer.hammingDistance = 2;
sniffer.doHammingMatch = true;
sniffer.jaroWinklerDistance = 0.8;
sniffer.doJaroWinklerMatch = true;
sniffer.doInnerMatch = true;
sniffer.caseSensitive = false);
```

## Sniffer Result

The sniffer result returns the values of the algorithms from a match. It's more appropriate for debuging.

```ts
let result = new Sniffer().getSnifferResult("Luxray", "lux");
```

# Contributors

The people that are helping the project with minor or big changes.

<a href="https://github.com/whiskers-apps/sniffer-ts/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=whiskers-apps/sniffer-ts" />
</a>
