import Grid from "../types/grid";
import GridCommand from "../types/gridCommand";

class MoveCommand implements GridCommand {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  do(grid: Grid): Grid {
    return {
      ...grid,
      xPos: this._x,
      yPos: this._y
    };
  }

  undo(grid: Grid): Grid {
    throw new Error("Method not implemented.");
  }
}

export default MoveCommand;
