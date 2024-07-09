import Crossword from "@/types/crossword";

const SelectAreaCommand = (startPos: number, endPos: number) => {
  return {
    do: (crossword: Crossword): Crossword => {
      const lastSquare = crossword.width*crossword.height - 1;
      const width = crossword.width;

      const getSelectAreaCoords = (): [number, number] => {
        // endPos is down and to the right
        if (endPos > startPos && (endPos % width) >= (startPos % width))
          return [startPos, endPos];
        // endPos is up and to the left
        else if (endPos < startPos && (endPos % width) <= (startPos % width))
          return [endPos, startPos];
        // endPos is down and to the left
        else if (endPos > startPos && (endPos % width) < (startPos % width))
          return [Math.floor(startPos / width) * width + (endPos % width),
          (startPos % width) + Math.floor(endPos / width) * width];
        // endPos is up and to the right
        else
          return [Math.floor(endPos / width) * width + (startPos % width),
          (endPos % width) + Math.floor(startPos / width) * width];
      };

      // boundary checks
      if(startPos < 0 || endPos < 0)
        return crossword;

      if(startPos > lastSquare || endPos > lastSquare)
        return crossword;

      const [topRight, bottomLeft] = getSelectAreaCoords();
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
        position: endPos,
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
