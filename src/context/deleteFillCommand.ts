import Crossword from "../types/crossword";

const DeleteFillCommand = (x: number, y: number, prevValue: string) => {
  return {
    do: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        grid: crossword.grid.map(
            (row, i) => i != x ? row : row.map(
              (square, j) => j != y ? square: ''))
      };
    },
    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        grid: crossword.grid.map(
            (row, i) => i != x ? row : row.map(
              (square, j) => j != y ? square : prevValue))
      };
    }
  };
};

export default DeleteFillCommand;
