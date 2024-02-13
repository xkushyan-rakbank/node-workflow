import { listOfWordsToBeShortened } from "../constants/listOfWordsToBeShortened";

export const useShortenName = nameToBeShortened => {
  if (!nameToBeShortened) return;
  for (let key in listOfWordsToBeShortened) {
    // Create a regular expression to match the key as a whole word
    let regex = new RegExp("\\b" + key + "\\b", "gi");
    // Replace occurrences of the key with its corresponding value
    nameToBeShortened = nameToBeShortened.replace(regex, listOfWordsToBeShortened[key]);
  }
  return nameToBeShortened;
};
