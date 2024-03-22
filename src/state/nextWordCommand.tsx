import Grid, { Orientation } from "../types/grid";
import GridCommand from "../types/gridCommand";

class NextWordCommand implements GridCommand {
  constructor() { }

  do(grid: Grid): Grid {
    for(let x = grid.currentWordIdx+1; x < grid.words.length; ++x) {
      if(grid.words[x].orientation === grid.orientation)
        return {
          ...grid,
          xPos: grid.words[x].squares[0].x,
          yPos: grid.words[x].squares[0].y,
          currentWordIdx: x
        };
    }

    // switch orientation
    const newOrientation = grid.orientation === Orientation.across ?
          Orientation.down : Orientation.across;
    for(let x = 0; x < grid.words.length; ++x) {
      if(grid.words[x].orientation === newOrientation)
        return {
          ...grid,
          xPos: grid.words[x].squares[0].x,
          yPos: grid.words[x].squares[0].y,
          orientation: newOrientation,
          currentWordIdx: x
        };
    }

    return grid;
  }

  undo(grid: Grid): Grid {
    throw new Error("Method not implemented.");
  }

}

export default NextWordCommand;
