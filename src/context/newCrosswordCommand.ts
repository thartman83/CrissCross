import Crossword from "../types/crossword";
import Orientation from "../types/orientation";

const NewCrosswordCommand = (height: number, width: number) => {
  return {
    do: (_: Crossword): Crossword => {
      return {
        title: '',
        author: '',
        position: {x: 0, y: 0},
        orientation: Orientation.across,
        height: height,
        width: width,
        grid: Array.from(Array(height), () => new Array(width).fill(''))
      }
    },

    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword
      }
    }
  };
}

export default NewCrosswordCommand;
