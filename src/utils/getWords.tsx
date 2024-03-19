import Grid, { Orientation, Word, Words } from "../types/grid";
import Square from "../types/square";
import { getWordsRow } from "./gridUtilities.tsx~";


export const getWords = (grid: Grid): Array<Word> => {
  let words: Words = [];

  const acrossWords = grid.fill.map((row: Array<Square>, _) => getWordsRow(row, Orientation.across)
  );
  words = [].concat(...acrossWords);
  return words;
};
