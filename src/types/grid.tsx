import GridCommand from "./gridCommand";
import Square from "./square";

export enum Orientation {
  across = 0,
  down,
};

export type Fill = Array<Array<Square>>;
export type Words = Array<Word>;

export type Word = {
  squares: Array<Square>;
  wordNo: number,
  orientation: Orientation,
};

type Grid = {
  height: number,
  width: number,
  fill: Fill,
  orientation: Orientation,
  xPos: number,
  yPos: number,
  answerCount: number,
  commandStack: Array<GridCommand>,
  words: Words,
};

export default Grid;
