//import Crossword from "../types/crossword";

export const CrosswordActions = {
  updateFill: 'updateFile',
};

export type CrosswordActionPayload = {
  x: number,
  y: number,
  value: string
};

//const crosswordReducer = (crossword: Crossword, action: {type: string, payload: CrosswordActionPayload}) => {

const crosswordReducer = (state, action) => {

  const payload = action.payload;
  const actionType = action.type;

  console.log('dispatching');

  switch(actionType) {
    case CrosswordActions.updateFill:
      console.log('updating fill');
      return crossword;
    default:
      return crossword;
  }
};

export default crosswordReducer;
