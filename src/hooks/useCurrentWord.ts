import { useEffect, useState } from "react";
import { useCrossword } from "../context/crosswordContext";
import Orientation from "../types/orientation";

const useCurrentWord = (): string[] => {
  const {crossword} = useCrossword();
  const grid = crossword.grid;
  const [x, y] = [crossword.position.x, crossword.position.y];
  const [currentWord, setCurrentWord] = useState<string[]>([grid[x][y]]);

  useEffect(() => {
    const newWord = [grid[x][y]];

    // helper function for next square based on orientation
    const nextSquare = (x: number, y: number,
                        forward: boolean): [number, number] => {
      const inc = forward ? 1 : -1;
      return crossword.orientation === Orientation.across ? [x, y + inc] :
        [x + inc, y];
    };

    let [curX, curY] = nextSquare(x, y, false);

    // move backwards until we hit the wall or a block
    while (curX >= 0 && curY >= 0 && crossword.grid[curX][curY] !== '.') {
      newWord.unshift(grid[curX][curY]);
      [curX, curY] = nextSquare(curX, curY, false);
    }

    const height = crossword.height;
    const width = crossword.width;
    [curX, curY] = nextSquare(x, y, true);

    // move forwards until we hit the wall or a block
    while (curX < height && curY < width && grid[curX][curY] !== '.') {
      newWord.push(grid[curX][curY]);
      [curX, curY] = nextSquare(curX, curY, true);
    }

    setCurrentWord(newWord);
  }, [crossword]);

  return currentWord;
};

export default useCurrentWord;
