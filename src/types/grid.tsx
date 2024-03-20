import GridCommand from "./gridCommand";

export enum SquareState {
  Letter = 0,
  Block,
  Rebus
};

export type Square = {
  state: SquareState,
  value: string,
  x: number,
  y: number,
  answerNo: number,
  focus: boolean,
  current: boolean,
};

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
