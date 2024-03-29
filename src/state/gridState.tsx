import { useReducer, useState } from "react";
import Grid, { Orientation, Fill, Words, Square, SquareState } from "../types/grid";
import { GridContext } from './gridContext';
import gridReducer from "./gridReducer";

const initFill = (height: number, width: number): Fill => {
    return Array.from({ length: height }).map((_, i) =>
      Array.from({ length: width }).map((_, j) => {
        const square: Square = {
          state: SquareState.Letter,
          value: '',
          x: i,
          y: j,
          answerNo: 0,
          focus: false,
          current: false
        };
        return square;
      }));
};

const GridState = (props: any) => {
  const [grid, dispatch] = useReducer(gridReducer, {});

  const fillAnswerNumbers = (grid: Grid): Grid => {

  };

  const getWords = (fill: Fill) => {

  };

  return(
    <GridContext.Provider value={{
      grid: grid
    }}>
      {props.children}
    </GridContext.Provider>
  );
};

export default GridState;
