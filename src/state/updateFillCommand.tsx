import Grid, {Fill, Square} from '../types/grid';
import GridCommand from '../types/gridCommand';


class UpdateFillCommand implements GridCommand {
  private _x: number;
  private _y: number;
  private _value: string;

  constructor(x: number, y: number, value: string) {
    this._x = x;
    this._y = y;
    this._value = value;
  }

  do(grid: Grid): Grid {
    return {
      ...grid,
      fill: this.updateFill(grid),
      commandStack: [...grid.commandStack, this]
    };
  }

  undo(grid: Grid): Grid {
    const newStack = [...grid.commandStack];
    newStack.pop();
    this._value = '';
    return {
      ...grid,
      fill: this.updateFill(grid),
      commandStack: newStack
    };
  }

  updateFill(grid: Grid): Fill {
    const newSquare: Square = {
      ...grid.fill[this._x][this._y],
      value: this._value
    };

    return grid.fill.map( (row, x) =>
      x != this._x ? row : row.map( (square, y) =>
        y != this._y ? square : newSquare
      )
    );
  }
}

export default UpdateFillCommand;
