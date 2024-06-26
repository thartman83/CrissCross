import Crossword from "@/types/crossword";
import CrosswordCommand from "@/types/crosswordCommand";

const UpdateClueCommand = (clueNo: number, value: string, prevValue: string): CrosswordCommand => {
  return {
    do: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        clues: [ ...crossword.clues.slice(0, clueNo), value,
                 ...crossword.clues.slice(clueNo + 1)]
      };
    },
    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        clues: [ ...crossword.clues.slice(0, clueNo), prevValue,
                 ...crossword.clues.slice(clueNo + 1)]
      };
    }
  };
};

export default UpdateClueCommand;
