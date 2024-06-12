import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

const UpdateCurrentWordCommand = (indicies: number[], orientation: Orientation,
                                  newWord: string[], prevWord: string[]) => {
  return {
    do: (crossword: Crossword): Crossword => {
      if(orientation === Orientation.across) {
        return {
          ...crossword,
          grid: [...crossword.grid.slice(0, indicies[0]),
                 ...newWord,
                 ...crossword.grid.slice(indicies[indicies.length-1]+1)]
        }
      } else {
        const newGrid = [
          ...crossword.grid,
        ];

        indicies.forEach((i, j) => newGrid.splice(i, 1, newWord[j]));

        return {
          ...crossword,
          grid: newGrid
        }
      }
    },
    undo: (crossword: Crossword): Crossword => {
      if(orientation === Orientation.across) {
        return {
          ...crossword,
          grid: [...crossword.grid.slice(0, indicies[0]),
                 ...prevWord,
                 ...crossword.grid.slice(indicies[indicies.length-1]+1)]
        }
      } else {
        const newGrid = [
          ...crossword.grid,
        ];

        indicies.forEach((i, j) => newGrid.splice(i, 1, prevWord[j]));

        return {
          ...crossword,
          grid: newGrid
        }
      }
    }
  };
};

export default UpdateCurrentWordCommand;
