import Grid, { Orientation } from "../types/grid";
import ToggleBlackCommand from "./toggleBlackCommand";
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
  moveNext: 'movenext',
  click: 'click',
  toggleOrientation: 'toggleOrientation',
};

export type GridReducerPayload = {
  x: number,
  y: number,
  value: string
};

const gridReducer = (state: Grid, action: {type: string,
                                           payload: GridReducerPayload}): Grid => {
  const payload: GridReducerPayload = action.payload;

  switch(action.type) {
  case GridActions.toggleBlack:
    return new ToggleBlackCommand(payload.x, payload.y).do(state);
  case GridActions.updateFill:
    return new MoveCommand(state.xPos, state.yPos+1,
                          state.orientation).do(new UpdateFillCommand(payload.x, payload.y, payload.value).do(state));
  case GridActions.deleteFill:
    if(payload.value === '')
      return new MoveCommand(payload.x, payload.y-1,
                            state.orientation).do(new UpdateFillCommand(payload.x, payload.y, '').do(state));
    else
      return new UpdateFillCommand(payload.x, payload.y, '').do(state);
  case GridActions.moveleft:
    if(state.yPos > 0)
      return new MoveCommand(state.xPos, state.yPos-1,
                            Orientation.across).do(state);
    return state;
  case GridActions.moveright:
    if(state.yPos < (state.width-1))
      return new MoveCommand(state.xPos, state.yPos+1,
                            Orientation.across).do(state);
    return state;
  case GridActions.moveup:
    if(state.xPos > 0)
      return new MoveCommand(state.xPos-1, state.yPos,
                            Orientation.down).do(state);
    return state;
  case GridActions.movedown:
    if(state.xPos < (state.height-1))
      return new MoveCommand(state.xPos+1, state.yPos,
                            Orientation.down).do(state);
    return state;
  case GridActions.click:
    return new MoveCommand(payload.x, payload.y,
                           state.orientation).do(state);
  case GridActions.toggleOrientation:
    return new MoveCommand(state.xPos, state.yPos,
                           state.orientation === Orientation.across ?
                           Orientation.down : Orientation.across).do(state);
  default:
    return state;
  };
};

export default gridReducer;
