import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

const UpdateCurrentWordCommand = (newWord: string) => {
  return {
    do: (crossword: Crossword): Crossword => {
      const w = crossword.currentWord();
      if(crossword.orientation === Orientation.across) {
        return {
          ...crossword,
          grid: [...crossword.grid.slice(0, w.indicies[0]),
                 ...newWord,
                 ...crossword.grid.slice(w.indicies[w.indicies.length-1]+1)]
        }
      } else {
        const newGrid = [
          ...crossword.grid,
        ];

        w.indicies.forEach((i, j) => newGrid.splice(i, 1, newWord[j]));

        return {
          ...crossword,
          grid: newGrid
        }


      }
    },
    undo: (crossword: Crossword): Crossword => {
      return crossword;
    }
  };
};

export default UpdateCurrentWordCommand;
