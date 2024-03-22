import Grid, { Orientation, Word } from "../types/grid";
import GridCommand from "../types/gridCommand";
import { getWordByPosition } from "../utils/gridUtilities";

class MoveCommand implements GridCommand {
  private _x: number;
  private _y: number;
  private _prevX: number;
  private _prevY: number;
  private _orientation: Orientation;
  private _prevOrientation: Orientation;

  constructor(x: number, y: number, orientation: Orientation) {
    this._x = x;
    this._y = y;
    this._prevX = 0;
    this._prevY = 0;
    this._orientation = orientation;
    this._prevOrientation = orientation == Orientation.across ? Orientation.down :
      Orientation.across;
  }

  do(grid: Grid): Grid {
    this._prevX = grid.xPos;
    this._prevY = grid.yPos;

    if(this._x < 0 || this._x >= grid.width ||
       this._y < 0 || this._y >= grid.height)
      return grid;

    return {
      ...grid,
      xPos: this._x,
      yPos: this._y,
      orientation: this._orientation,
      currentWordIdx: getWordByPosition(grid.words, this._x, this._y,
                                        this._orientation)
    };
  }

  undo(grid: Grid): Grid {
    return {
      ...grid,
      xPos: this._prevX,
      yPos: this._prevY,
      orientation: this._orientation,
      currentWordIdx: getWordByPosition(grid.words, this._prevX, this._prevY,
                                        this._prevOrientation)
    };
  }
}

export default MoveCommand;
