import Crossword, { CrosswordGrid } from "../types/crossword";
import Orientation from "../types/orientation";

type Word = {
  wordNo: number,
  squares: string[],
  x: number,
  y: number,
};

// This really needs to be renamed to prevent conflicts/confusion with
// the wordlist for autofill
export type crosswordWordView = {
  'acrosses': {[key: string]: string[]},
  'downs': {[key: string]: string[]}
}

export const answerGrid = (crossword: Crossword) : Array<Array<number>> => {
  let answerCount = 1;

  const grid = crossword.grid;

  return grid.map((row: string[], i: number) =>
    row.map((_: string, j: number) =>
      ((grid[i][j] != '.') &&
        (i == 0 || grid[i - 1][j] === '.' ||
          j == 0 || grid[i][j - 1] === '.')) ? answerCount++: 0));
};

export const currentWordGrid = (crossword: Crossword): Array<Array<number>> => {
  let grid = crossword.grid.map((row: string[], _) =>
    Array(row.length).fill(0));

  const [x, y] = [crossword.position.x, crossword.position.y];

  // mark the current position as active
  grid[x][y] = 1;

  // helper function for next square based on orientation
  const nextSquare = (x: number, y: number, forward: boolean): [number, number] => {
    const inc = forward ? 1 : -1;
    return crossword.orientation === Orientation.across ? [x, y+inc] : [x+inc, y];
  };

  let cur = nextSquare(x, y, false);

  // move backwards until we hit the wall or a block
  while(cur[0] >= 0 && cur[1] >= 0 && crossword.grid[cur[0]][cur[1]] !== '.') {
    grid[cur[0]][cur[1]] = 1;
    cur = nextSquare(cur[0],cur[1], false);
  }

  const height = crossword.height;
  const width = crossword.width;
  cur = nextSquare(x,y, true);

  // move forwards until we hit the wall or a block
  while(cur[0] < height && cur[1] < width &&
    crossword.grid[cur[0]][cur[1]] !== '.') {
    grid[cur[0]][cur[1]] = 1;
    cur = nextSquare(cur[0], cur[1], true);
  }

  return grid;
};

export const getWordsView = (crossword: Crossword): crosswordWordView => {
//  const {crossword} = useCrossword();

  const acrosses: {[key: string]: string[]} = {};
  const downs: {[key: string]: string[]} = {};

  const answers = answerGrid(crossword);

  let currentWord: Word = {
    wordNo: 0,
    squares: [],
    x: 0,
    y: 0
  };

  crossword.grid.flat().forEach((s: string, i: number) => {
    const x = Math.floor(i / crossword.width);
    const y = i % crossword.width;

    if(s === '.') {
      // if there is an existing word push it
      if(currentWord.wordNo !== 0)
        acrosses[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: [], x: 0, y: 0};
    } else if(y === (crossword.width-1)) {
      currentWord.squares.push(s);

      if(currentWord.wordNo !== 0)
        acrosses[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: [], x: 0, y: 0};
    } else if(currentWord.wordNo === 0) {
      currentWord.wordNo = answers[x][y];
      currentWord.x = x;
      currentWord.y = y;
      currentWord.squares.push(s);
    } else {
      currentWord.squares.push(s);
    }
  });

  // transpose the grid
  const columnGrid = crossword.grid[0].map(
    (_, colIndex) => crossword.grid.map(row => row[colIndex]));

  currentWord = { wordNo: 0, squares: [], x: 0, y: 0};

  columnGrid.flat().forEach((s: string, i: number) => {
    const y = Math.floor(i / crossword.height);
    const x = i % crossword.height;

    if(s === '.') {
      // if there is an existing word push it
      if(currentWord.wordNo !== 0)
        downs[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: [], x: 0, y: 0};
    } else if(x === (crossword.height-1)) {
      currentWord.squares.push(s);

      if(currentWord.wordNo !== 0)
        downs[currentWord.wordNo] = currentWord.squares;

      currentWord = { wordNo: 0, squares: [], x: 0, y: 0};
    } else if(currentWord.wordNo === 0) {
      currentWord.wordNo = answers[x][y];
      currentWord.x = x;
      currentWord.y = y;
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

export const getPositionByWordNo =
  (crossword: Crossword, wordNo: string): {x: number, y: number} => {

    const pos = answerGrid(crossword).reduce((acc, row: number[], x: number) =>
      row.reduce((acc, num: number, y: number) =>
        Number(wordNo) !== num ? acc : {x: x, y: y}, acc), {x: -1, y: -1});

    return pos;
};


export const insertWord = (crossword: Crossword, wordNo: string,
                           orientation: Orientation, value: string): CrosswordGrid =>
  {

  let {x, y} = getPositionByWordNo(crossword, wordNo);
  const newGrid = crossword.grid.map((row: string[]) => {
    return [...row]
  });

  value.split('').forEach((c: string) => {
    newGrid[x][y] = c;
    x = x + (orientation === Orientation.across ? 0 : 1);
    y = y + (orientation === Orientation.across ? 1 : 0);
  });

  return newGrid
};
