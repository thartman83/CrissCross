import { useWordList } from "../context/wordListContext";
import { crosswordWordView } from "../hooks/useWords";
import Orientation from "../types/orientation";

const maxWords = 999999999;

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

export const mostConstrainedWord = ({acrosses, downs}: crosswordWordView):
[wordNo: string, orientation: Orientation] => {
  const minAcross = Object.keys(acrosses).reduce(
    (acc: [number, string], wordNo: string): [number, string] => {

      // A filled in word is not considered constrained
      if (acrosses[wordNo].indexOf('') === -1)
        return acc;

      const possibleWords = availableWords(acrosses[wordNo]);
      if (possibleWords.length < acc[0])
        return [possibleWords.length, wordNo];

      return acc;
    }, [maxWords, '0']);

  const minDown = Object.keys(downs).reduce(
    (acc: [number, string], wordNo: string): [number, string] => {

      // A filled in word is not considered constrained
      if (downs[wordNo].indexOf('') === -1)
        return acc;

      const possibleWords = availableWords(downs[wordNo]);
      if (possibleWords.length < acc[0])
        return [possibleWords.length, wordNo];

      return acc;
  }, [maxWords, '0']);

  // Prefer acrosses for the moment
  if(minAcross[0] <= minDown[0] && minAcross[0] !== -1 && minAcross[0] !== 0)
    return [minAcross[1], Orientation.across];
  else if(minDown[0] !== -1 && minDown[0] !== 0)
    return [minDown[1], Orientation.down];
  else
    return ['0', Orientation.across];

}
