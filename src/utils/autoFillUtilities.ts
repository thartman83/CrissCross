import { useWordList } from "../context/wordListContext";
import { crosswordWordView } from "../hooks/useWords";

// Returns the list of available words given a string of constraints
export const availableWords = (constraint: string[]) => {
  const {wordList} = useWordList();

  return wordList.filter(({ word }: { word: string }) =>
    word.length === constraint.length &&
    constraint.reduce((acc: boolean, val: string, i: number): boolean =>
      acc && (val === '' || val === word[i]), true));
};


// Returns a list of constraint values for a given set of word lists
// -1 indicates that the word is complete
export const constrainedWords = ({acrosses, downs}: crosswordWordView): {
  acrosses: number[],
  downs: number[]
} => {

  const newAcrosses = Object.keys(acrosses).map((num: string) => {
    const word = acrosses[num];
    return word.indexOf('') !== -1 ? -1 : availableWords(word).length
  });

  const newDowns = Object.keys(downs).map((num: string) => {
    const word = downs[num];
    return word.indexOf('') !== -1 ? -1 : availableWords(word).length
  });

  return {
    acrosses: newAcrosses,
    downs: newDowns
  };
};
