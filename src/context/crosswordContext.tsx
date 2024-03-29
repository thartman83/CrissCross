import { ReactNode, createContext, useContext, useReducer } from "react";
import Crossword from "../types/crossword";
import Orientation from "../types/orientation";
import UpdateGridCommand from "./updateGridCommand";
import MovePositionCommand from "./movePositionCommand";
import ToggleOrientationCommand from "./toggleOrientationCommand";
import DeleteFillCommand from "./deleteFillCommand";
import ToggleBlockCommand from "./toggleBlockCommand";

const defaultHeight = 15;
const defaultWidth = 15;

export enum MoveDirection {
  UP = 0,
  DOWN,
  LEFT,
  RIGHT,
  JUMP,
};

export type CrosswordContextType = {
  crossword: Crossword,
  updateFill: (x:number, y:number, value: string) => void,
  movePosition: (x: number, y: number, direction: MoveDirection) => void,
  toggleOrientation: () => void,
  deleteFill: (x: number, y: number) => void,
  toggleBlock: (x: number, y: number) => void,
};

const CrosswordContext = createContext<CrosswordContextType|undefined>(undefined);

export const useCrossword = () => {
  const context = useContext(CrosswordContext);
  if(!context) {
    throw new Error(
      "useCrossword must be used within a CrosswordContextProvider"
    );
  }
  return context;
};

const initCrossword = (): Crossword => {
  return {
    title: '',
    author: '',
    position: {x:0, y:0},
    orientation: Orientation.across,
    height: defaultHeight,
    width: defaultWidth,
    grid: Array.from(Array(defaultWidth), () => new Array(defaultHeight).fill(''))
  };
};

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
      return moveCmd.do(updateCmd.do(toggleCmd.do(crossword)));
    }

    // otherwise update an move on
    return moveCmd.do(updateCmd.do(crossword));
  }
  case CrosswordActions.movePosition: {
    const moveCmd = MovePositionCommand(payload.x, payload.y, ...currentPos);
    return moveCmd.do(crossword);
  }
  case CrosswordActions.toggleOrientation: {
    const toggleCmd = ToggleOrientationCommand();
    return toggleCmd.do(crossword);
  }
  case CrosswordActions.deleteFill: {
    const prevSquare = getPrevSquare(...currentPos, crossword.orientation);
    const moveCmd = MovePositionCommand(...prevSquare, ...currentPos);

    // check if we are removing a block square
    if(currentVal === '.') {
      const toggleCmd = ToggleBlockCommand(payload.x, payload.y);
      return moveCmd.do(toggleCmd.do(crossword));
    }

    // otherwise simply delete the square
    const deleteCmd = DeleteFillCommand(payload.x, payload.y, currentVal);
    return moveCmd.do(deleteCmd.do(crossword));
  }
  case CrosswordActions.toggleBlock: {
    const nextSquare = getNextSquare(...currentPos, crossword.orientation);
    const moveCmd = MovePositionCommand(...nextSquare,
                                        crossword.position.x, crossword.position.y);
    const toggleBlockCmd = ToggleBlockCommand(payload.x, payload.y);
    return moveCmd.do(toggleBlockCmd.do(crossword));
  }
  default:
      return crossword;
  }
};

const CrosswordContextProvider = ({children}: {children: ReactNode}) => {
  const initState: Crossword = initCrossword();
  const [crosswordState, dispatch] = useReducer(crosswordReducer, initState);

  const updateFill = (x: number, y: number, value: string) => {
    dispatch({type: CrosswordActions.updateFill, payload:
              { x: x, y: y, value: value }});
  };

  const movePosition = (x: number, y: number, direction: MoveDirection) => {
    // if the movement direction is orthogonal to the current orientation
    // toggle the orientation instead of moving
    const changeOrientationDown =
          crosswordState.orientation === Orientation.across &&
          (direction === MoveDirection.UP || direction === MoveDirection.DOWN);
    const changeOrientationAcross =
          crosswordState.orientation === Orientation.down &&
          (direction === MoveDirection.LEFT || direction === MoveDirection.RIGHT);

    if(changeOrientationDown || changeOrientationAcross) {
      dispatch({type: CrosswordActions.toggleOrientation, payload:
                {x: x, y: y, value: ''}});
    } else {
      dispatch({type: CrosswordActions.movePosition, payload:
                {x: x, y: y, value: '', }});
    }
  };

  const toggleOrientation = () => {
    dispatch({type: CrosswordActions.toggleOrientation,
              payload: {x: 0, y: 0, value: ''}});
  };

  const deleteFill = (x: number, y: number) => {
    dispatch({type: CrosswordActions.deleteFill,
              payload: {x: x, y: y, value: ''}});
  };

  const toggleBlock = (x: number, y: number) => {
    dispatch({type: CrosswordActions.toggleBlock,
              payload: {x: x, y: y, value: ''}});
  };

  return (
    <CrosswordContext.Provider value={{
      crossword: crosswordState,
      updateFill: updateFill,
      movePosition: movePosition,
      toggleOrientation: toggleOrientation,
      deleteFill: deleteFill,
      toggleBlock: toggleBlock,
    }}>
        {children}
    </CrosswordContext.Provider>
  );
};

export default CrosswordContextProvider;
