import Crossword from "../../../projects/crisscross/src/types/crossword";

const MoveGridComment =
  (x: number, y: number, prevX: number, prevY: number) => {
    return {
      do: (crossword: Crossword): Crossword => {
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
