import Crossword from "../types/crossword";

export const CrosswordActions = {
  updateFill: 'updateFile',
};

export type CrosswordActionPayload = {
  x: number,
  y: number,
  value: string
};

const crosswordReducer = (state: Crossword, action: {type: string, payload: CrosswordActionPayload}) => {

  const payload = action.payload;
  const actionType = action.type;

  switch(actionType) {
    case CrosswordActions.updateFill:
      return state;
    default:
      return state;
  }
};

export default crosswordReducer;
