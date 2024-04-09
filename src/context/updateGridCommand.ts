import Crossword from "../types/crossword";

const UpdateGridCommand =
  (x:number, y: number, value: string, prevValue: string) => {
    return {
      do: (crossword: Crossword): Crossword => {
        return {
          ...crossword,
          grid: crossword.grid.map(
            (row, i) => i != x ? row : row.map(
              (square, j) => j != y ? square : value))
        };
      },
      undo: (crossword: Crossword): Crossword => {
        return {
          ...crossword,
          position: {x, y},
          grid: crossword.grid.map(
            (row, i) => i != x ? row : row.map(
              (square, j) => j != y ? square : prevValue))
        };
      }
  };
};

export default UpdateGridCommand;
