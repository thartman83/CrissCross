import Grid, { Orientation } from "../types/grid";
import Square, { SquareState } from "../types/square";

export const findSymmetrySquare =
  (x: number, y: number, state: Grid): {x: number, y: number} => {
  return {x: (state.width - x) - 1, y: (state.height - y) - 1};
  };


export const initGrid = (width: number, height: number): Grid => {

  // Construct a new empty grid fill
  const newFill = Array.from({length: height}).map( (_, i) =>
    Array.from({length: width}).map((_, j) => {
      const square: Square = {
        state: SquareState.Letter,
        value: '',
        x: i,
        y: j,
        answerNo: 0,
        focus: false
      };
      return square;
    })
  );

  const newGrid: Grid = {
    fill: newFill,
    height: height,
    width: width,
    answerCount: 0,
    orientation: Orientation.across,
    commandStack: []
  };

  return fillAnswerNos(newGrid);
};

export const fillAnswerNos = (grid: Grid): Grid => {
  let answerCount = 1;

  const newFill = grid.fill.map( (row: Array<Square>, i) => {
    return row.map( (square: Square, j: number) =>
      {
        const num = ((grid.fill[i][j].state !== SquareState.Black) &&
                     (i == 0 || grid.fill[i-1][j].state === SquareState.Black ||
                      j == 0 || grid.fill[i][j-1].state === SquareState.Black))
              ? answerCount++ : 0;
        return {
          ...square,
          answerNo: num
        };
      });
  });

  return {
    ...grid,
    fill: newFill
  };
};
