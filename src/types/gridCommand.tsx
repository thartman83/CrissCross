import Grid from "./grid";

interface GridCommand {
  do(grid: Grid): Grid;
  undo(grid: Grid): Grid;
};

export default GridCommand;
