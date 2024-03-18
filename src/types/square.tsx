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
  focus: boolean,
  current: boolean,
};

export default Square;
