import Crossword from "../types/crossword";

const JumpPositionCommand = (pos: number, prev: number) => {
  return {
    do: (crossword: Crossword): Crossword => {

      // boundary checks
      if(pos < 0 || pos >= (crossword.height * crossword.width))
        return crossword;

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
export default JumpPositionCommand;
