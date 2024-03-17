import Grid, { Fill } from "../types/grid";
import GridCommand from "../types/gridCommand";
import { SquareState } from "../types/square";
import { findSymmetrySquare } from "../utils/gridUtilities";

class ToggleBlackCommand implements GridCommand {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  do(grid: Grid): Grid {

    return {
      ...grid,
      fill: this.toggle(grid),
      commandStack: [...grid.commandStack, this]
    };
  }

  undo(grid: Grid): Grid {
    const newStack = [...grid.commandStack];
    newStack.pop();

    return {
      ...grid,
      fill: this.toggle(grid),
      commandStack: newStack
    };
  }

  private toggle(grid: Grid): Fill {
    const newFill = grid.fill.map((row, _) => row.map((square, _) => square));
    const symPos = findSymmetrySquare(this._x, this._y, grid);
    const state = newFill[this._x][this._y].state;
    const newState =
          state === SquareState.Black ? SquareState.Letter : SquareState.Black;
    const newSquare = {
      ...grid.fill[this._x][this._y],
      state: newState
    };

    const newSymSqaure = {
      ...grid.fill[symPos.x][symPos.y],
      state: newState
    };

    newFill[this._x][this._y] = newSquare;
    newFill[symPos.x][symPos.y] = newSymSqaure;

    return newFill;
  }
}

export default ToggleBlackCommand;
