import { ReactNode, createContext, useContext, useReducer, useState } from "react";
import { KeyboardEvent, MouseEvent } from 'react';
import Crossword, { GridView, WordView, Word } from "../types/crossword";
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
import { toGridView, toWordsView, toCurrentWord } from "../utils/gridUtilities";
import UpdateMetadataCommand from "./updateMetadataCommand";
import UpdateCurrentWordCommand from "./updateCurrentWordCommand";

type SquareKeyDownEvent = KeyboardEvent<HTMLElement>;

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
  onClick: (pos: number) => void,
  onDoubleClick: (pos: number) => void,
  onNew: (height: number, width: number) => void,
  updateMetadata: (name: string, value: string) => void,
  updateCurrentWord: (value: string) => void,
  undo: () => void,
};

export type CrosswordContextProps = {
  children: ReactNode,
  initArgs?: {
    width: number,
    height: number,
  },
};

export const CrosswordContext =
  createContext<CrosswordContextType|undefined>(undefined);

export const useCrossword = () => {
  const context = useContext(CrosswordContext);
  if(!context) {
    throw new Error(
      "useCrossword must be used within a CrosswordContextProvider"
    );
  }
  return context;
};

const initCrossword = (initArgs: any): Crossword => {
  const crosswordStr = localStorage.getItem('crossword');
  let crosswordData = null;
  const app = useApp();
  const height = initArgs?.height || app.appSettings.height;
  const width = initArgs?.width || app.appSettings.width;
  const grid = initArgs?.grid || Array(height*width).fill('');

  if(!crosswordStr) {
    crosswordData = {
      title: '',
      author: '',
      copyrigh: '',
      notes: '',
      position: 0,
      orientation: Orientation.across,
      height: height,
      width: width,
      grid: grid,
    };
  } else {
    crosswordData = JSON.parse(crosswordStr);
  }

  return {
    ...crosswordData,
    gridView: function (): GridView {
      return toGridView(this.grid, this.width);
    },
    wordView: function (): WordView {
      return toWordsView(this);
    },
    currentWord: function (): Word {
      return toCurrentWord(this);
    },
  };
};

const CrosswordContextProvider = ({children, initArgs}: CrosswordContextProps) => {
  const initState: Crossword = initCrossword(initArgs);
  const [crosswordState, dispatch] = useReducer(crosswordReducer, initState);
  const [commandStack, setCommandStack] = useState<CrosswordCommand[]>([]);

  const pos = crosswordState.position;
  const orientation = crosswordState.orientation;

  const onKeyDown = (e: SquareKeyDownEvent) => {
    const key = e.key.toUpperCase();

    // undo previous command
    if(e.ctrlKey && key === 'Z') {
      undo();
    }
    // all letters and numbers are valid
    else if(/[A-Z0-9]/.test(key) && e.key.length === 1) {

      const cmd = UpdateGridCommand(pos, key, crosswordState.grid[pos]);
      setCommandStack([...commandStack, cmd]);

      const delta = orientation === Orientation.across ? 1 : crosswordState.width;
      dispatch({type: CrosswordActions.crosswordCommand, payload:
                [cmd, MovePositionCommand(pos + delta, pos)]});

    } else if(key === '.') {

      const cmd = ToggleBlockCommand(pos);
      setCommandStack([...commandStack, cmd]);

      const delta = orientation === Orientation.across ? 1 : crosswordState.width;
      dispatch({type: CrosswordActions.crosswordCommand, payload:
                [cmd, MovePositionCommand(pos + delta, pos)]});

    } else if(key === 'ARROWRIGHT') {

      if(orientation === Orientation.across) {
        const cmd = MovePositionCommand(pos + 1, pos);
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      }

    } else if(key === 'ARROWLEFT') {

      if(orientation === Orientation.across) {
        const cmd = MovePositionCommand(pos - 1, pos);
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      }

    } else if(key === 'ARROWUP') {

      if(orientation === Orientation.down) {
        const cmd = MovePositionCommand(pos - crosswordState.width, pos);
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      }

    } else if(key === 'ARROWDOWN') {

      if(orientation === Orientation.down) {
        const cmd = MovePositionCommand(pos + crosswordState.width, pos);
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      } else {
        const cmd = ToggleOrientationCommand();
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});
      }

    } else if(key === ' ') {

      const cmd = ToggleOrientationCommand();
      dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});

    } else if (key === 'DELETE' || key === 'BACKSPACE') {

      // if the current state is a block, we need to make sure we are
      // symetrically handling the deletion
      const cmd = crosswordState.grid[pos] === '.' ?
            ToggleBlockCommand(pos) :
            DeleteFillCommand(pos, crosswordState.grid[pos]);
      const delta = orientation === Orientation.across ? 1 : crosswordState.width;

      setCommandStack([...commandStack, cmd]);

      dispatch({type: CrosswordActions.crosswordCommand, payload:
                [cmd, MovePositionCommand(pos - delta, pos)]});

    } else if (key === 'TAB') {

      const curDir = crosswordState.orientation;
      const otherDir = crosswordState.orientation === Orientation.across ?
            Orientation.down : Orientation.across;
      const pos = crosswordState.position;
      const wordList = crosswordState.wordView();
      const wordsDirList = wordList.filter(w => w.orientation === curDir);
      const wordsOtherDirList = wordList.filter(w => w.orientation === otherDir);

      const idx = wordsDirList
            .findIndex(word => word.indicies.includes(crosswordState.position));

      if(idx == (wordsDirList.length-1)) {
        const nextWord = wordsOtherDirList[0];
        const cmd = MovePositionCommand(nextWord.indicies[0], pos);

        dispatch({type: CrosswordActions.crosswordCommand, payload:
                  [cmd, ToggleOrientationCommand()]});
      } else {

        const nextWord = wordsDirList[idx+1];
        const cmd = MovePositionCommand(nextWord.indicies[0], pos);
        dispatch({type: CrosswordActions.crosswordCommand, payload: [cmd]});

      }
    }
  };

  const onClick = (pos: number) => {
    const prevPos = crosswordState.position;
    const cmd = MovePositionCommand(pos, prevPos);
    dispatch({type: CrosswordActions.crosswordCommand, payload:
              [cmd]});
  };

  const onDoubleClick = (pos: number) => {
    const prevPos = crosswordState.position;
    const cmd = MovePositionCommand(pos, prevPos);
    dispatch({type: CrosswordActions.crosswordCommand, payload:
              [cmd, ToggleOrientationCommand()]});
  };

  const updateCurrentWord = (value: string) => {
    const currentWord = crosswordState.currentWord();
    const prevWord = currentWord.squares;
    const cmd = UpdateCurrentWordCommand(currentWord.indicies,
                                         currentWord.orientation,
                                         value.split(''), prevWord);
    setCommandStack([...commandStack, cmd]);
    dispatch({type: CrosswordActions.updateCurrentWord, payload: [cmd]});
  };

  const undo = () => {
    if(commandStack.length > 0) {
      const newStack = [...commandStack];
      const cmd = newStack.pop();

      if(typeof cmd !== 'undefined') {
        setCommandStack([...newStack]);
        dispatch({type: CrosswordActions.undoCrosswordCommand, payload: [cmd]});
      }
    }
  };

  const onNew = (height: number, width: number) => {
    const cmd = NewCrosswordCommand(height, width);
    setCommandStack([]);
    dispatch({type: CrosswordActions.newCrossword, payload: [cmd]});
  };

  const updateMetadata = (name: string, value: string) => {
    const cmd = UpdateMetadataCommand(name, value);
    dispatch({type: CrosswordActions.updateMetadata, payload: [cmd]});
  };

  return (
    <CrosswordContext.Provider value={{
      crossword: crosswordState,
      onKeyDown: onKeyDown,
      onClick: onClick,
      onDoubleClick: onDoubleClick,
      onNew: onNew,
      updateMetadata: updateMetadata,
      updateCurrentWord: updateCurrentWord,
      undo: undo,
    }}>
        {children}
    </CrosswordContext.Provider>
  );
};

export default CrosswordContextProvider;
