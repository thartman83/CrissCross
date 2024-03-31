import { useCrossword } from "../context/crosswordContext";
import { answerGrid } from "../utils/gridUtilities";

type Word = {
  wordNo: number,
  squares: string[]
};

export type WordList = {
  [key: string]: string[]
};

export type WordsList = {
  'acrosses': WordList
  'downs': WordList
}

const useWords = (): WordsList => {
  const {crossword} = useCrossword();

  const acrosses: WordList = {};
  const downs: WordList = {};

  const answers = answerGrid(crossword);

  let currentWord: Word = {
    wordNo: 0,
    squares: []
  };

  crossword.grid.flat().forEach((s: string, i: number) => {
    const x = Math.floor(i / crossword.width);
    const y = i % crossword.width;

    if(s === '.') {
      // if there is an existing word push it
      if(currentWord.wordNo !== 0)
        acrosses[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: []};
    } else if(y === (crossword.width-1)) {
      currentWord.squares.push(s);

      if(currentWord.wordNo !== 0)
        acrosses[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: []};
    } else if(currentWord.wordNo === 0) {
      currentWord.wordNo = answers[x][y];
      currentWord.squares.push(s);
    } else {
      currentWord.squares.push(s);
    }
  });

  // transpose the grid
  const columnGrid = crossword.grid[0].map(
    (_, colIndex) => crossword.grid.map(row => row[colIndex]));

  currentWord = { wordNo: 0, squares: []};

  columnGrid.flat().forEach((s: string, i: number) => {
    const y = Math.floor(i / crossword.height);
    const x = i % crossword.height;

    if(s === '.') {
      // if there is an existing word push it
      if(currentWord.wordNo !== 0)
        downs[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: []};
    } else if(x === (crossword.height-1)) {
      currentWord.squares.push(s);

      if(currentWord.wordNo !== 0)
        downs[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: []};
    } else if(currentWord.wordNo === 0) {
      currentWord.wordNo = answers[x][y];
      currentWord.squares.push(s);
    } else {
      currentWord.squares.push(s);
    }
  });

  return {
    'acrosses': acrosses,
    'downs': downs
  }
};

export default useWords;
