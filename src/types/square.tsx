export enum SquareState {
  Letter = 0,
  Black,
  Rebus
};

type Square = {
  state: SquareState,
  value: string,
  x: number,
  y: number,
  answerNo: number,
  focus: boolean
};

export default Square;
