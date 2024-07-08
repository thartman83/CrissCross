import Orientation from "./orientation";

export type CrosswordGrid = string[];
export type GridView = string[][];
export type Word = {
  wordNo: number,
  indicies: number[],
  squares: string[],
  orientation: Orientation,
};
export type WordView = Word[];

// A words view of the grid
export type CrosswordWords = {
  acrosses: { [key: number]: string[] },
  downs: { [key: number]: string[] }
};

type Crossword = {
  title: string,
  author: string,
  copyright: string,
  notes: string,
  position: number,
  orientation: Orientation,
  height: number,
  width: number,
  grid: CrosswordGrid,
  gridView: () => GridView,
  wordView: () => WordView,
  currentWord: () => Word,
  clues: string[],
  selection: number[],
};

export default Crossword;
