import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

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
