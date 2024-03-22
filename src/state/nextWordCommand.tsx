import Grid, { Orientation } from "../types/grid";
import GridCommand from "../types/gridCommand";

class NextWordCommand implements GridCommand {
  constructor() { }

  do(grid: Grid): Grid {
    throw new Error("Method not implemented.");
  }

  undo(grid: Grid): Grid {
    throw new Error("Method not implemented.");
  }

}

export default NextWordCommand;
