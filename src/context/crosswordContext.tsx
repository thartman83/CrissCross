import { ReactNode, createContext, useContext, useReducer, useState } from "react";
import { KeyboardEvent, MouseEvent } from 'react';
import Crossword from "../types/crossword";
import Orientation from "../types/orientation";
import crosswordReducer, { CrosswordActions} from "./crosswordReducer";
import { useApp } from "./applicationContext";
import UpdateGridCommand from "./updateGridCommand";
import CrosswordCommand from "../types/crosswordCommand";
import ToggleBlockCommand from "./toggleBlockCommand";
import MovePositionCommand from "./movePositionCommand";
import ToggleOrientationCommand from "./toggleOrientationCommand";
import DeleteFillCommand from "./deleteFillCommand";
import NewCrosswordCommand from "./newCrosswordCommand";

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
  onKeyDown: (e: SquareKeyDownEvent) => void,
  onClick: (x: number, y: number, e: SquareMouseEvent) => void,
  onNew: (height: number, widht: number) => void,
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
  const crossword = localStorage.getItem('crossword');
  if(crossword) {
    return JSON.parse(crossword);
  }

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
  const [commandStack, setCommandStack] = useState<CrosswordCommand[]>([]);

  const {x,y} = crosswordState.position;
  const orientation = crosswordState.orientation;

  const onKeyDown = (e: SquareKeyDownEvent) => {
    const key = e.key.toUpperCase();

    // undo previous command
    if(e.ctrlKey && key === 'Z') {
      if(commandStack.length > 0) {
        const newStack = [...commandStack];
        const cmd = newStack.pop();

        if(typeof cmd !== 'undefined') {
          setCommandStack([...newStack]);
          dispatch({type: CrosswordActions.undoCrosswordCommand, payload: cmd});
        }
      }
    }
    // all letters and numbers are valid
    else if(/[A-Z0-9]/.test(key) && e.key.length === 1) {

      const cmd = UpdateGridCommand(x, y, key, crosswordState.grid[x][y]);
      setCommandStack([...commandStack, cmd]);
      dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

      const deltaX = orientation === Orientation.down ? 1 : 0;
      const deltaY = deltaX === 1 ? 0 : 1;
      dispatch({type: CrosswordActions.crosswordCommand, payload:
                MovePositionCommand(x + deltaX, y + deltaY, x, y)});

    } else if(key === '.') {

      const cmd = ToggleBlockCommand(x, y);
      setCommandStack([...commandStack, cmd]);
      dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

      const deltaX = orientation === Orientation.down ? 1 : 0;
      const deltaY = deltaX === 1 ? 0 : 1;
      dispatch({type: CrosswordActions.crosswordCommand, payload:
                MovePositionCommand(x + deltaX, y + deltaY, x, y)});

    } else if(key === 'ARROWRIGHT') {

      if(orientation === Orientation.across) {
        const cmd = MovePositionCommand(x, y + 1, x, y);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      }

    } else if(key === 'ARROWLEFT') {

      if(orientation === Orientation.across) {
        const cmd = MovePositionCommand(x, y - 1, x, y);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      }

    } else if(key === 'ARROWUP') {

      if(orientation === Orientation.down) {
        const cmd = MovePositionCommand(x - 1, y, x, y);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      }

    } else if(key === 'ARROWDOWN') {

      if(orientation === Orientation.down) {
        const cmd = MovePositionCommand(x + 1, y, x, y);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
      }

    } else if(key === ' ') {

      const cmd = ToggleOrientationCommand();
      dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

    } else if (key === 'DELETE' || key === 'BACKSPACE') {

      // if the current state is a block, we need to make sure we are
      // symetrically handling the deletion
      if(crosswordState.grid[x][y] === '.') {

        const cmd = ToggleBlockCommand(x, y,);
        setCommandStack([...commandStack, cmd]);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

      } else {

        const cmd = DeleteFillCommand(x, y, crosswordState.grid[x][y]);
        setCommandStack([...commandStack, cmd]);
        dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

      }

      const deltaX = orientation === Orientation.down ? 1 : 0;
      const deltaY = deltaX === 1 ? 0 : 1;
      dispatch({type: CrosswordActions.crosswordCommand, payload:
                MovePositionCommand(x - deltaX, y - deltaY, x, y)});
    }
  };

  const onClick = (x: number, y: number, e: SquareMouseEvent) => {
    const pos = crosswordState.position;
    const cmd = MovePositionCommand(x, y, pos.x, pos.y);
    dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});

    if(e.type === 'dblclick') {
      const cmd = ToggleOrientationCommand();
      dispatch({type: CrosswordActions.crosswordCommand, payload: cmd});
    }
  };

  const onNew = (height: number, width: number) => {
    const cmd = NewCrosswordCommand(height, width);
    setCommandStack([]);
    dispatch({type: CrosswordActions.newCrossword, payload: cmd});
  };

  return (
    <CrosswordContext.Provider value={{
      crossword: crosswordState,
      onKeyDown: onKeyDown,
      onClick: onClick,
      onNew: onNew,
    }}>
        {children}
    </CrosswordContext.Provider>
  );
};

export default CrosswordContextProvider;
