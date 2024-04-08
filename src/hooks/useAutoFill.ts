import { useEffect, useState } from "react";
import { useCrossword } from "../context/crosswordContext";
import useWords, {crosswordWordView} from "./useWords";
import Orientation from "../types/orientation";
import { availableWords, mostConstrainedWord } from "../utils/autoFillUtilities";

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

      const [wordNo, orientation] = mostConstrainedWord(words);
      const possibleWords = availableWords(orientation === Orientation.across ?
        words.acrosses[wordNo] : words.downs[wordNo]);

      const randWord = possibleWords[Math.random() * possibleWords.length];

    };

    generateAutoFill(words);
  },[crossword]);
};

export default useAutoFill;
