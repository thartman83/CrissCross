import useLocalStorage from "@/hooks/useLocalStorage";
import Crossword from "../types/crossword";
import CrosswordCommand from "../types/crosswordCommand";

export const CrosswordActions = {
  newCrossword: 'newCrossword',
  loadCrossword: 'loadCrossword',
  crosswordCommand: 'crosswordCommand',
  undoCrosswordCommand: 'undoCrosswordCommand',
  updateMetadata: 'updateMetadata',
  updateCurrentWord: 'updateCurrentWord'
};

export type CrosswordActionPayload = {
  x: number,
  y: number,
  value: string,
};

const crosswordReducer = (crossword: Crossword, action: {type: string, payload: CrosswordCommand[], autoSave: boolean }) => {
  const actionType = action.type;
  let newCrosswordState = crossword;
  const cmds = action.payload;
  const [ _, storeCrossword ] = useLocalStorage<Crossword>('crossword', crossword);

  switch (actionType) {

    case CrosswordActions.crosswordCommand: {
      newCrosswordState = cmds.reduce((acc, cmd) => cmd.do(acc), crossword);
      break;
    }

    case CrosswordActions.undoCrosswordCommand: {
      newCrosswordState = cmds.reduce((acc, cmd) => cmd.undo(acc), crossword);
      break;
    }

    case CrosswordActions.newCrossword: {
      newCrosswordState = cmds[0].do(crossword);
      break;
    }

    case CrosswordActions.loadCrossword: {
      newCrosswordState = cmds[0].do(crossword);
      break;
    }

    case CrosswordActions.updateMetadata: {
      newCrosswordState = cmds[0].do(crossword);
      break;
    }

    case CrosswordActions.updateCurrentWord: {
      newCrosswordState = cmds[0].do(crossword);
      break;
    }

    default:
      newCrosswordState = crossword;
  }

  if(action.autoSave) {
    storeCrossword(newCrosswordState);
  }

  return newCrosswordState;
};

export default crosswordReducer;
