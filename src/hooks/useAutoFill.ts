import { useEffect, useState } from "react";
import { useCrossword } from "../context/crosswordContext";
import useWords, {crosswordWordView} from "./useWords";
import Orientation from "../types/orientation";
import { constrainedWords, availableWords } from "../utils/autoFillUtilities";

const useAutoFill = () => {
  const {crossword} = useCrossword();
  const [autoFillGrid, setAutoFillGrid] = useState(crossword.grid);
  const words: crosswordWordView = useWords();

  useEffect(() => {
    const generateAutoFill = async (words: crosswordWordView) => {
      // Auto fill strategy
      // 1. Sort current word list by most constrained
      // 2. Pick random word that meets constraints
      // 3. Check if the grid is still valid (no words are too constrained,
      //    no matches)
      // 4a. if yes push on to stack and repeat starting at 2
      // 4b. if no pick new word
      // 4bi. if words list is exhausted, pop the previous word

      const conWords = constrainedWords(words);

      // find the most constrained word, which will be the lowest
      // value excluding -1

      const minAcross = conWords.acrosses
        .reduce((acc: [number, number], val: number, i: number):
                [number, number] => acc[0] > val && val !== -1 ?
          [val, i] : acc, [0,0]);
      const minDowns = conWords.downs
        .reduce((acc: [number, number], val: number, i: number):
                [number, number] => acc[0] > val && val !== -1 ?
          [val, i] : acc, [0,0]);

      const minWordOrientation = minAcross[0] < minDowns[0] ? Orientation.across :
        Orientation.down;

      const minWordIdx = minWordOrientation ? minAcross[1] : minDowns[1];
//      const availWords = availableWords(minWordOrientation === Orientation.across ?
  //      words.acrosses[minWordIdx] ? words.downs[minWordIdx]);
    };

    generateAutoFill(words);
  },[crossword]);
};

export default useAutoFill;
