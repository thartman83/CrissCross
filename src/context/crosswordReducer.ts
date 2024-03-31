import Crossword from "../types/crossword";
import Orientation from "../types/orientation";
import UpdateGridCommand from "./updateGridCommand";
import MovePositionCommand from "./movePositionCommand";
import ToggleOrientationCommand from "./toggleOrientationCommand";
import DeleteFillCommand from "./deleteFillCommand";
import ToggleBlockCommand from "./toggleBlockCommand";

export const CrosswordActions = {
  updateFill: 'updateFill',
  deleteFill: 'deleteFill',
  movePosition: 'movePosition',
  toggleOrientation: 'toggleOrientation',
  toggleBlock: 'toggleBlock'
};

export type CrosswordActionPayload = {
  x: number,
  y: number,
  value: string,
};

const crosswordReducer = (crossword: Crossword, action: {type: string, payload: CrosswordActionPayload}) => {
  const payload = action.payload;
  const actionType = action.type;
  let newCrosswordState = crossword;

  const getNextSquare = (x: number, y: number, orientation: Orientation):
        [number, number] => {
          return orientation === Orientation.across ?
            [x, y + 1] : [x + 1, y];
        };
  const getPrevSquare = (x: number, y: number, orientation: Orientation):
        [number, number] => {
          return orientation === Orientation.across ?
            [x, y - 1] : [x - 1, y];
        };
  const currentPos: [number, number] = [crossword.position.x, crossword.position.y];
  const currentVal = crossword.grid[crossword.position.x][crossword.position.y];

  switch(actionType) {
  case CrosswordActions.updateFill: {
    const nextSquare = getNextSquare(...currentPos, crossword.orientation);
    const moveCmd = MovePositionCommand(...nextSquare, ...currentPos);

    const updateCmd = UpdateGridCommand(payload.x, payload.y, payload.value,
                                        currentVal);

    // check if we are updating a block square
    if(currentVal === '.') {
      const toggleCmd = ToggleBlockCommand(payload.x, payload.y);
      newCrosswordState = moveCmd.do(updateCmd.do(toggleCmd.do(crossword)));
    } else {
      // otherwise update an move on
      newCrosswordState = moveCmd.do(updateCmd.do(crossword));
    }
    break;
  }
  case CrosswordActions.movePosition: {
    const moveCmd = MovePositionCommand(payload.x, payload.y, ...currentPos);
    newCrosswordState = moveCmd.do(crossword);
    break;
  }
  case CrosswordActions.toggleOrientation: {
    const toggleCmd = ToggleOrientationCommand();
    newCrosswordState = toggleCmd.do(crossword);
    break;
  }
  case CrosswordActions.deleteFill: {
    const prevSquare = getPrevSquare(...currentPos, crossword.orientation);
    const moveCmd = MovePositionCommand(...prevSquare, ...currentPos);

    // check if we are removing a block square
    if(currentVal === '.') {
      const toggleCmd = ToggleBlockCommand(payload.x, payload.y);
      newCrosswordState = moveCmd.do(toggleCmd.do(crossword));
    } else {
      // otherwise simply delete the square
      const deleteCmd = DeleteFillCommand(payload.x, payload.y, currentVal);
      newCrosswordState = moveCmd.do(deleteCmd.do(crossword));
    }
    break;
  }
  case CrosswordActions.toggleBlock: {
    const nextSquare = getNextSquare(...currentPos, crossword.orientation);
    const moveCmd = MovePositionCommand(...nextSquare,
                                        crossword.position.x, crossword.position.y);
    const toggleBlockCmd = ToggleBlockCommand(payload.x, payload.y);
    newCrosswordState = moveCmd.do(toggleBlockCmd.do(crossword));
    break;
  }
  default:
      newCrosswordState = crossword;
  }

  localStorage.setItem('crossword', JSON.stringify(newCrosswordState));

  return newCrosswordState;
};

export default crosswordReducer;
