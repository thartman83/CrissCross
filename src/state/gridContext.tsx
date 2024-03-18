import Grid from "../types/grid";
import Square, { SquareState } from "../types/square";
import ToggleBlackCommand from "./toggleBlackCommand";
import { fillAnswerNos } from "../utils/gridUtilities";
import UpdateFillCommand from "./updateFillCommand";
import MoveCommand from "./moveCommand";

export const GridActions = {
  keyDown: 'keydown',
  updateFill: 'updateFill',
  deleteFill: 'deleteFill',
  toggleBlack: 'toggleBlack',
  moveleft: 'moveleft',
  moveright: 'moveright',
  moveup: 'moveup',
  movedown: 'movedown',
  click: 'click'
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

const gridReducer = (state: Grid, action: {type: string, payload: GridReducerPayload}): Grid => {
  const payload: GridReducerPayload = action.payload;

  switch(action.type) {
  case GridActions.toggleBlack:
    return fillAnswerNos(new ToggleBlackCommand(payload.x, payload.y).do(state));
  case GridActions.updateFill:
    return new MoveCommand(state.xPos, state.yPos+1).do(new UpdateFillCommand(payload.x, payload.y, payload.value).do(state));
  case GridActions.deleteFill:
    if(payload.value === '')
      return new MoveCommand(payload.x, payload.y-1).do(new UpdateFillCommand(payload.x, payload.y, '').do(state));
    else
      return new UpdateFillCommand(payload.x, payload.y, '').do(state);
  case GridActions.moveleft:
    if(state.yPos > 0)
      return new MoveCommand(state.xPos, state.yPos-1).do(state);
    return state;
  case GridActions.moveright:
    if(state.yPos < (state.width-1))
      return new MoveCommand(state.xPos, state.yPos+1).do(state);
    return state;
  case GridActions.moveup:
    if(state.xPos > 0)
      return new MoveCommand(state.xPos-1, state.yPos).do(state);
    return state;
  case GridActions.movedown:
    if(state.xPos < (state.height-1))
      return new MoveCommand(state.xPos+1, state.yPos).do(state);
    return state;
  case GridActions.click:
    return new MoveCommand(payload.x, payload.y).do(state);
  default:
    return state;
  };
};

export default gridReducer;
