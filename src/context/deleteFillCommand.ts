import Crossword from "../types/crossword";

const DeleteFillCommand = (pos: number, prevValue: string) => {
  return {
    do: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        grid: [...crossword.grid.slice(0, pos), '',
               ...crossword.grid.slice(pos+1)],
      };
    },
    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        grid: [...crossword.grid.slice(0, pos), prevValue,
               ...crossword.grid.slice(pos+1)],
      };
    }
  };
};

export default DeleteFillCommand;
