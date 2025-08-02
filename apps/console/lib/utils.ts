import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRandomElement(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateApiKeyName(): string {
  const descriptiveWords = [
    "awesome",
    "brilliant",
    "clever",
    "dynamic",
    "elegant",
    "fantastic",
    "genius",
    "innovative",
    "magnificent",
    "outstanding",
    "powerful",
    "remarkable",
    "spectacular",
    "superb",
    "tremendous",
    "wonderful",
    "excellent",
    "amazing",
    "incredible",
    "impressive",
    "marvelous",
    "stellar",
    "supreme",
    ];

  const adjectives = [
    "moody",
    "wet",
    "cheeky",
    "wild",
    "crazy",
    "shiny",
    "fuzzy",
    "silly",
    "bold",
    "bouncy",
    "zany",
    "swift",
    "grumpy",
    "dusty",
    "icy",
    "sunny",
    "stormy",
    "proud",
    "mighty",
    "cuddly",
    "snazzy",
    "quirky",
    "dreamy",
    "lazy",
  ];

  const nouns = [
    "monkey",
    "kitten",
    "panther",
    "fox",
    "dragon",
    "otter",
    "tiger",
    "bunny",
    "panda",
    "wolf",
    "lion",
    "lemur",
    "eagle",
    "bear",
    "hedgehog",
    "dolphin",
    "owl",
    "puppy",
    "swan",
    "raven",
    "mole",
    "gecko",
    "unicorn",
    "zebra",
  ];

  // Randomly decide the order: sexy word in the beginning, middle, or end
  const order = Math.floor(Math.random() * 3);

  let parts: string[];
  switch (order) {
    case 0:
      parts = [
        getRandomElement(descriptiveWords),
        getRandomElement(adjectives),
        getRandomElement(nouns),
      ];
      break;
    case 1:
      parts = [
        getRandomElement(adjectives),
        getRandomElement(descriptiveWords),
        getRandomElement(nouns),
      ];
      break;
    default:
      parts = [
        getRandomElement(adjectives),
        getRandomElement(nouns),
        getRandomElement(descriptiveWords),
      ];
      break;
  }

  return parts.join("-");
}
