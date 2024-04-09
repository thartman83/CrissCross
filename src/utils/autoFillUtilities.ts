import { WordList } from "../context/wordListContext";
import { crosswordWordView } from "../hooks/useWords";
import Crossword from "../types/crossword";
import Orientation from "../types/orientation";
import { getWordsView, insertWord } from "../utils/gridUtilities";

const maxWords = 999999999;

// Returns the list of available words given a string of constraints
export const availableWords = (constraint: string[], wordList: WordList) => {
  return wordList.filter(({ word }: { word: string }) =>
    word.length === constraint.length &&
    constraint.reduce((acc: boolean, val: string, i: number): boolean =>
      acc && (val === '' || val === word[i]), true));
};


export const mostConstrainedWord = ({ acrosses, downs }: crosswordWordView, wordList: WordList):
  [wordNo: string, orientation: Orientation] => {
  const minAcross = Object.keys(acrosses).reduce(
    (acc: [number, string], wordNo: string): [number, string] => {

      // A filled in word is not considered constrained
      if (acrosses[wordNo].indexOf('') === -1)
        return acc;

      const possibleWords = availableWords(acrosses[wordNo], wordList);
      if (possibleWords.length < acc[0])
        return [possibleWords.length, wordNo];

      return acc;
    }, [maxWords, '0']);

  const minDown = Object.keys(downs).reduce(
    (acc: [number, string], wordNo: string): [number, string] => {

      // A filled in word is not considered constrained
      if (downs[wordNo].indexOf('') === -1)
        return acc;

      const possibleWords = availableWords(downs[wordNo], wordList);
      if (possibleWords.length < acc[0])
        return [possibleWords.length, wordNo];

      return acc;
    }, [maxWords, '0']);

  // Prefer acrosses for the moment
  if (minAcross[0] <= minDown[0] && minAcross[0] !== -1 && minAcross[0] !== 0)
    return [minAcross[1], Orientation.across];
  else if (minDown[0] !== -1 && minDown[0] !== 0)
    return [minDown[1], Orientation.down];
  else
    return ['0', Orientation.across];
}

export const isPuzzleValid = (acrosses: { [key: string]: string[] },
  downs: { [key: string]: string[] },
  wordList: WordList): boolean => {
  if (!Object.keys(acrosses).reduce((acc: boolean, key: string) =>
    acc && availableWords(acrosses[key], wordList).length > 0, true))
    return false;

  if (!Object.keys(downs).reduce((acc: boolean, key: string) =>
    acc && availableWords(downs[key], wordList).length > 0, true))
    return false;

  return true;
}

// export const fillNextWord = async (crossword: Crossword): Promise<Crossword | null> => {
//   const words = getWordsView(crossword);

//   // check if the puzzle is still valid
//   if (!isPuzzleValid(words.acrosses, words.downs, wordList))
//     return null;

//   // Check to see if the grid is filled, as an end state
//   if (crossword.grid.reduce((acc, row: string[]) =>
//     row.reduce((acc, square: string) => acc && square !== '', acc), true))
//     return crossword;

//   const [wordNo, orientation] = mostConstrainedWord(words, wordList);
//   const possibleWords = availableWords(orientation === Orientation.across ?
//     words.acrosses[wordNo] : words.downs[wordNo], wordList);

//   while (possibleWords.length > 0) {
//     const randIdx = Math.floor(Math.random() * possibleWords.length);
//     const randWord = possibleWords.splice(randIdx)[0];
//     const newCrossword = {
//       ...crossword,
//       grid: insertWord(crossword, wordNo, orientation, randWord.word)
//     }

//     const res = await fillNextWord(newCrossword);
//     if (res !== null)
//       return res;
//   });
// }

const gaf = async (crossword: Crossword, wordList: WordList): Promise<Crossword | null> => {
  const words = getWordsView(crossword);

  // check if the puzzle is still valid
  if (!isPuzzleValid(words.acrosses, words.downs, wordList))
    return null;

  // Check to see if the grid is filled, as an end state
  if (crossword.grid.reduce((acc, row: string[]) =>
    row.reduce((acc, square: string) => acc && square !== '', acc), true))
    return crossword;

  const [wordNo, orientation] = mostConstrainedWord(words, wordList);
  const possibleWords = availableWords(orientation === Orientation.across ?
    words.acrosses[wordNo] : words.downs[wordNo], wordList);

  while (possibleWords.length > 0) {
    const randIdx = Math.floor(Math.random() * possibleWords.length);
    const randWord = possibleWords.splice(randIdx)[0];
    const newCrossword = {
      ...crossword,
      grid: insertWord(crossword, wordNo, orientation, randWord.word)
    }

    const res = await gaf(newCrossword, wordList);
    if (res !== null)
      return res;
  }

  // if we get here we need to bail, we've exhausted the available
  // possible words for this clue and need to backtrack
  return null;
};

export const generateAutoFill = async (crossword: Crossword, wordList: WordList): Promise<void> => {
  // Auto fill strategy
  // 1. Sort current word list by most constrained
  // 2. Pick random word that meets constraints
  // 3. Check if the grid is still valid (no words are too constrained,
  //    no matches)
  // 4a. if yes push on to stack and repeat starting at 2
  // 4b. if no pick new word
  // 4bi. if words list is exhausted, pop the previous word

  // deep copy the grid
  const autoFillGrid = {
    ...crossword,
    grid: crossword.grid.map((row: string[]) => {
      return [...row];
    })
  }

  await gaf(autoFillGrid, wordList);
  console.log('done autofill');
}
