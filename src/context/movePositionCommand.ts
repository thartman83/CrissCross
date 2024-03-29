import Crossword from "../types/crossword";

const MovePositionCommand =
  (x: number, y: number, prevX: number, prevY: number) => {
    return {
      do: (crossword: Crossword): Crossword => {
        // boundary checks
        if(x < 0 || y < 0 || y >= crossword.width || x >= crossword.height)
          return crossword;

        // otherwise update the position
        return {
          ...crossword,
          position: {x: x, y: y}
        };
      },

      undo: (crossword: Crossword): Crossword => {
        return {
          ...crossword,
          position: {x: prevX, y: prevY}
        }
      }
    };
  };

export default MovePositionCommand;
