import GridCommand from "./gridCommand";
import Square from "./square";

export enum Orientation {
  across = 0,
  down,
};

export type Fill = Array<Array<Square>>;

type Grid = {
  height: number,
  width: number,
  fill: Fill,
  orientation: Orientation,
  xPos: number,
  yPos: number,
  answerCount: number,
  commandStack: Array<GridCommand>
};

export default Grid;
