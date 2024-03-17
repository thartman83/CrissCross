import Grid from "../types/grid";
import Square, { SquareState } from "../types/square";
import ToggleBlackCommand from "./toggleBlackCommand";
import { fillAnswerNos } from "../utils/gridUtilities";
import UpdateFillCommand from "./updateFillCommand";

export const GridActions = {
  keyDown: 'keydown',
  updateFill: 'updateFill',
  toggleBlack: 'toggleBlack'
};

export type GridReducerPayload = {
  x: number,
  y: number,
  value: string
};

const setGridValue = (x: number, y: number, value: string, state: Grid): Grid => {
  const newSquare: Square = {
    state: SquareState.Letter,
    x: x,
    y: y,
    value: value,
    focus: false,
  };

  const newFill = state.fill.map((row: Array<Square>, i: number) => {
    return i != x ? row : row.map((square: Square, j: number) => {
      return j != y ? square : newSquare;
    });
  });

  return {
    ...state,
    fill: newFill,
  };
};

const gridReducer = (state: Grid, action: {type: string, payload: GridReducerPayload}) => {
  const payload: GridReducerPayload = action.payload;

  switch(action.type) {
  case GridActions.toggleBlack:
    return fillAnswerNos(new ToggleBlackCommand(payload.x, payload.y).do(state));
  case GridActions.updateFill:
    return new UpdateFillCommand(payload.x, payload.y, payload.value).do(state);
  default:
    return state;
  };
};

export default gridReducer;
