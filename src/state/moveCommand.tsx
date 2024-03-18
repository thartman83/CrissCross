import Grid, { Orientation } from "../types/grid";
import GridCommand from "../types/gridCommand";
import { fillCurrentHighlighted } from "../utils/gridUtilities";

class MoveCommand implements GridCommand {
  private _x: number;
  private _y: number;
  private _orientation: Orientation;

  constructor(x: number, y: number, orientation: Orientation) {
    this._x = x;
    this._y = y;
    this._orientation = orientation;
  }

  do(grid: Grid): Grid {
    return fillCurrentHighlighted({
      ...grid,
      xPos: this._x,
      yPos: this._y,
      orientation: this._orientation,
    });
  }

  undo(grid: Grid): Grid {
    throw new Error("Method not implemented.");
  }
}

export default MoveCommand;
