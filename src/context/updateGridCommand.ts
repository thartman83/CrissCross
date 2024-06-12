import Crossword from "../types/crossword";

const UpdateGridCommand =
  (pos: number, value: string, prevValue: string) => {
    return {
      do: (crossword: Crossword): Crossword => {
        return {
          ...crossword,
          grid: [...crossword.grid.slice(0, pos), value,
                 ...crossword.grid.slice(pos+1)]
        };
      },
      undo: (crossword: Crossword): Crossword => {
        return {
          ...crossword,
          position: pos,
          grid: [...crossword.grid.slice(0, pos), prevValue,
                 ...crossword.grid.slice(pos+1)]
        };
      }
  };
};

export default UpdateGridCommand;
