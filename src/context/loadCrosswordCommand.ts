import Crossword, { GridView, Word, WordView } from "@/types/crossword";
import Orientation from "@/types/orientation";
import { toCurrentWord, toGridView, toWordsView } from "@/utils/gridUtilities";
import { PuzFile } from "@/utils/puzFileUtils";

const LoadCrosswordCommand = (puz: PuzFile) => {
  return {
    do: (_: Crossword): Crossword => {
      return {
        title: puz.title,
        author: puz.author,
        copyright: puz.copyright,
        notes: puz.notes,
        position: 0,
        orientation: Orientation.across,
        height: puz.height,
        width: puz.width,
        grid: puz.grid,
        clues: puz.clues,
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
    },

    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword
      };
    }
  };
};

export default LoadCrosswordCommand;
