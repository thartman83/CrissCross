import Crossword from "../types/crossword";
import RotationalSymetricSquare from "./rotationalSymetricSquare";

const ToggleBlockCommand = (pos: number) => {
  return {
    do: (crossword: Crossword): Crossword => {
      const symSquare = RotationalSymetricSquare(pos, crossword.height,
                                                 crossword.width);
      const value = crossword.grid[pos] === '.' ? '' : '.';

      const newGrid = crossword.grid.map((square: string, idx: number) =>
        idx === pos || idx === symSquare ? value : square
        );

      return {
        ...crossword,
        grid: newGrid
      };
    },
    undo: (crossword: Crossword): Crossword => {
      const symSquare = RotationalSymetricSquare(pos, crossword.height,
                                                 crossword.width);
      const value = crossword.grid[pos] === '.' ? '' : '.';

      const newGrid = crossword.grid.map((square: string, idx: number) =>
        idx === pos || idx === symSquare ? value : square
        );

      return {
        ...crossword,
        position: pos,
        grid: newGrid
      }
    }
  };
};

export default ToggleBlockCommand;
