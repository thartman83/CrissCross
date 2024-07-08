import Crossword from "@/types/crossword";

const SelectAreaCommand = (topRight: number, bottomLeft: number) => {
  return {
    do: (crossword: Crossword): Crossword => {
      // boundary checks

      if(topRight < 0 || bottomLeft < topRight)
        return crossword;

      if(bottomLeft > crossword.width*crossword.height)
        return crossword;

      const gridWidth = crossword.width;
      const startRow = Math.floor(topRight / gridWidth);
      const startCol = topRight % gridWidth;
      const selectWidth = (bottomLeft % gridWidth) - (topRight % gridWidth);
      const selectHeight = Math.floor(bottomLeft / gridWidth) -
        Math.floor(topRight / gridWidth);

      const selectionArea: number[] = [];
      for(let x = startRow; x <= startRow + selectHeight; x++) {
        for(let y = startCol; y <= startCol + selectWidth; y++) {
          selectionArea.push(x * gridWidth + y);
        }
      }

      return {
        ...crossword,
        position: topRight,
        selection: selectionArea,
      };
    },
    undo: (crossword: Crossword): Crossword => {
      return {
        ...crossword,
        selection: [],
      };
    },
  };
};

export default SelectAreaCommand;
