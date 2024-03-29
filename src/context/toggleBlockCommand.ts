import Crossword from "../types/crossword";
import RotationalSymetricSquare from "./rotationalSymetricSquare";

const ToggleBlockCommand = (x: number, y: number) => {
  return {
    do: (crossword: Crossword): Crossword => {
      const symSquare = RotationalSymetricSquare(x, y, crossword.height,
                                                 crossword.width);
      const value = crossword.grid[x][y] === '.' ? '' : '.';

      const newGrid = crossword.grid.map(
        (row, i) => row.map((square, j) =>
          ((i == x && j == y) || (i == symSquare.x && j == symSquare.y)) ?
          value : square))

      return {
        ...crossword,
        grid: newGrid
      };
    },
    undo: (crossword: Crossword): Crossword => {
      const symSquare = RotationalSymetricSquare(x, y, crossword.height,
                                                 crossword.width);
      const value = crossword.grid[x][y] === '.' ? '' : '.';

      const newGrid = crossword.grid.map(
        (row, i) => row.map((square, j) =>
          ((i == x && j == y) || (i == symSquare.x && j == symSquare.y)) ?
          value : square))

      return {
        ...crossword,
        grid: newGrid
      }
    }
  };
};

export default ToggleBlockCommand;
