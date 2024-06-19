import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

const MovePositionCommand = (pos: number, prev: number) => {
  return {
    do: (crossword: Crossword): Crossword => {

      // boundary checks
      if(pos < 0 || pos >= (crossword.height * crossword.width))
        return crossword;

      // Don't advance if we are in the last column
      if(crossword.orientation === Orientation.across &&
        (prev % crossword.width) === (crossword.width-1) && prev < pos)
        return crossword;

      // Don't go backwards if we are in the first column
      if(crossword.orientation === Orientation.across &&
        (prev % crossword.width) === 0 && prev > pos)
        return crossword;

      // otherwise update the position
      return {
        ...crossword,
        position: pos
      }
    },

    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        position: prev
      }
    }
  }
}
export default MovePositionCommand;
