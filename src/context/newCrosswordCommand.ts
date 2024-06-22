import Crossword, { GridView, WordView, Word } from "../types/crossword";
import Orientation from "../types/orientation";
import { toCurrentWord, toGridView, toWordsView } from "../utils/gridUtilities";

const NewCrosswordCommand = (height: number, width: number) => {
  return {
    do: (_: Crossword): Crossword => {
      const newCrossword: Crossword = {
        title: '',
        author: '',
        copyright: '',
        notes: '',
        position: 0,
        orientation: Orientation.across,
        height: height,
        width: width,
        clues: Array(height+width-1).fill(''),
        grid: Array(height*width).fill(''),
        gridView: function (): GridView {
          return toGridView(this.grid, this.width);
        },
        wordView: function (): WordView {
          return toWordsView(this);
        },
        currentWord: function (): Word {
          return toCurrentWord(this);
        },
      }

      return newCrossword;
    },

    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword
      }
    }
  };
}

export default NewCrosswordCommand;
