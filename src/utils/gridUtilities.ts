import Crossword from "../types/crossword";
import { CrosswordGrid, GridView, WordView, Word } from "../types/crossword";
import Orientation from "../types/orientation";

export const answerGrid = (crossword: Crossword) : Array<Array<number>> => {
  let answerCount = 1;

  const grid = crossword.gridView();

  return grid.map((row: string[], i: number) =>
    row.map((_: string, j: number) =>
      ((grid[i][j] != '.') &&
        (i == 0 || grid[i - 1][j] === '.' ||
          j == 0 || grid[i][j - 1] === '.')) ? answerCount++: 0));
};

export const currentWordGrid = (crossword: Crossword): number[] => {
  let retval = Array(crossword.height*crossword.width).fill(0);

  const pos = crossword.position;

  // mark the current position as active
  retval[pos] = 1;

  const delta = crossword.orientation === Orientation.across ? 1 : crossword.width;
  const maxLen = crossword.orientation === Orientation.across ? crossword.width :
    crossword.width * crossword.height;
  const minLen = crossword.orientation === Orientation.across ? pos / crossword.width * crossword.width : 0;
  let cur = pos - delta;

  // move backwards until we hit the wall or a block
  while(cur >= minLen && crossword.grid[cur] !== '.') {
    retval[cur] = 1;
    cur -= delta;
  }

  cur = pos + delta;

  // move forwards until we hit the wall or a block
  while(cur < maxLen && crossword.grid[cur] !== '.') {
    retval[cur] = 1;
    cur += delta;
  }

  return retval;
};

export const getPositionByWordNo =
  (crossword: Crossword, wordNo: string): {x: number, y: number} => {

    const pos = answerGrid(crossword).reduce((acc, row: number[], x: number) =>
      row.reduce((acc, num: number, y: number) =>
        Number(wordNo) !== num ? acc : {x: x, y: y}, acc), {x: -1, y: -1});

    return pos;
};

export const toGridView = (grid: CrosswordGrid, width: number): GridView => {
  return grid.reduce(
        (rows, square, idx) => {
          return (idx % width === 0 ? rows.push([square]) :
            rows[rows.length-1].push(square)) && rows;
        }, Array());
}

//// this will need to be refactored because holy crow is it ugly
export const toWordsView = (crossword: Crossword): WordView => {

  let currentWord: Word = {
    wordNo: 0,
    indicies: [],
    squares: [],
    orientation: Orientation.across
  };
  const words: Word[] = [];
  const answers = answerGrid(crossword);
//  const gridView = toGridView(crossword.grid, crossword.width);

  // acrosses first
  crossword.grid.forEach((s: string, i: number) => {
    const x = Math.floor(i / crossword.width);
    const y = i % crossword.width;

    if(s === '.') {
      // if there is an existing word push it to the word list
      if(currentWord.wordNo !== 0)
        words.push(currentWord);

      currentWord = { wordNo: 0, indicies: [], squares: [],
                      orientation: Orientation.across
                    };
    } else if (y === (crossword.width-1)) {
      // if we are at the end of the row and not a block, push it to the
      // current word
      currentWord.squares.push(s);
      currentWord.indicies.push(i);

      if(currentWord.wordNo !== 0)
        words.push(currentWord);

      currentWord = { wordNo: 0, indicies: [], squares: [],
                      orientation: Orientation.across
                    };
    } else if(currentWord.wordNo === 0) {
      // otherwise we are at the start of the word
      currentWord.wordNo = answers[x][y];
      currentWord.indicies = [i],
      currentWord.squares = [s]
    } else {
      // every other square is just another letter in the word
      currentWord.indicies.push(i);
      currentWord.squares.push(s);
    }
  });

  // downs next
  currentWord = { wordNo: 0, indicies: [], squares: [],
                  orientation: Orientation.down
                };
  for(let i = 0; i < crossword.width; ++i) {
    for(let j = 0; j < crossword.height; ++j) {
      //debugger;
      const pos = j * crossword.width + i;
      const s = crossword.grid[pos];
      if(s === '.') {
        if(currentWord.wordNo !== 0)
          words.push(currentWord);

        currentWord = { wordNo: 0, indicies: [], squares: [],
                        orientation: Orientation.down};
      } else if(j === (crossword.height-1)) {
        currentWord.squares.push(s);
        currentWord.indicies.push(pos);

        if(currentWord.wordNo !== 0)
          words.push(currentWord);

        currentWord = { wordNo: 0, indicies: [], squares: [],
                        orientation: Orientation.down};
      } else if(currentWord.wordNo === 0) {
        currentWord.wordNo = answers[j][i];
        currentWord.indicies = [pos];
        currentWord.squares = [s];
      } else {
        currentWord.indicies.push(pos);
        currentWord.squares.push(s);
      }
    }
  }

  return words.sort((a, b) => a.wordNo < b.wordNo ? -1 : 1);
};

export const toCurrentWord = (crossword: Crossword): Word => {
  return crossword.wordView()
    .find(word => word.orientation === crossword.orientation &&
      word.indicies.includes(crossword.position)) ||
    {wordNo: 0, indicies: [], squares: [], orientation: Orientation.across};
};

export const errorGrid = (crossword: Crossword): boolean[] => {
  const retval = Array(crossword.height * crossword.width).fill(false);
  const words = toWordsView(crossword);

  const uncheckedWords = words.filter( (w: Word) => w.squares.length === 1);
  const twoLetterWords = words.filter( (w: Word) => w.squares.length === 2);

  uncheckedWords.forEach(w => w.indicies.forEach( i => retval[i] = true));
  twoLetterWords.forEach(w => w.indicies.forEach( i => retval[i] = true));

  return retval;
};
