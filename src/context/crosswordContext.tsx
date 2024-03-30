import { ReactNode, createContext, useContext, useReducer } from "react";
import { KeyboardEvent, MouseEvent } from 'react';
import Crossword from "../types/crossword";
import Orientation from "../types/orientation";
import crosswordReducer, { CrosswordActions} from "./crosswordReducer";
import { useApp } from "./applicationContext";

type SquareKeyDownEvent = KeyboardEvent<HTMLInputElement>;
type SquareMouseEvent = MouseEvent<HTMLInputElement>;

export enum MoveDirection {
  UP = 0,
  DOWN,
  LEFT,
  RIGHT,
  JUMP,
};

export type CrosswordContextType = {
  crossword: Crossword,
  onKeyDown: (e: SquareKeyDownEvent) => void
  onClick: (x: number, y: number, e: SquareMouseEvent) => void
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
  const app = useApp();

  return {
    title: '',
    author: '',
    position: {x:0, y:0},
    orientation: Orientation.across,
    height: app.appSettings.height,
    width: app.appSettings.width,
    grid: Array.from(Array(app.appSettings.height), () =>
      new Array(app.appSettings.width).fill(''))
  };
};

const CrosswordContextProvider = ({children}: {children: ReactNode}) => {
  const initState: Crossword = initCrossword();
  const [crosswordState, dispatch] = useReducer(crosswordReducer, initState);

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

  const {x,y} = crosswordState.position;

  const onKeyDown = (e: SquareKeyDownEvent) => {
    const key = e.key.toUpperCase();

    // all letters and numbers are valid
    if(/[A-Z0-9]/.test(key) && e.key.length === 1) {
      dispatch({type: CrosswordActions.updateFill, payload: {
        x: x, y: y, value: key }});
    } else if(key === '.') {
      dispatch({type: CrosswordActions.toggleBlock,
              payload: {x: x, y: y, value: ''}});
    } else if(key === 'ARROWRIGHT') {
      movePosition(x, y+1, MoveDirection.RIGHT);
    } else if(key === 'ARROWLEFT') {
      movePosition(x, y-1, MoveDirection.LEFT);
    } else if(key === 'ARROWUP') {
      movePosition(x-1, y, MoveDirection.UP);
    } else if(key === 'ARROWDOWN') {
      movePosition(x+1, y, MoveDirection.DOWN);
    } else if(key === ' ') {
      dispatch({type: CrosswordActions.toggleOrientation,
              payload: {x: 0, y: 0, value: ''}});
    } else if (key === 'DELETE' || key === 'BACKSPACE') {
      dispatch({type: CrosswordActions.deleteFill,
              payload: {x: x, y: y, value: ''}});
    }
  };

  const onClick = (x: number, y: number, e: SquareMouseEvent) => {
    if(e.type == 'click'){
        movePosition(x,y,MoveDirection.JUMP);
    } else if(e.type === 'dblclick') {
      dispatch({type: CrosswordActions.toggleOrientation,
                payload: {x: 0, y: 0, value: ''}});
    }
  };

  return (
    <CrosswordContext.Provider value={{
      crossword: crosswordState,
      onKeyDown: onKeyDown,
      onClick: onClick,
    }}>
        {children}
    </CrosswordContext.Provider>
  );
};

export default CrosswordContextProvider;
